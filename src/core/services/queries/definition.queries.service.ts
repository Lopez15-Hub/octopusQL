import "reflect-metadata";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { AlterClause } from "../../interfaces/database/clauses/alter.clause.interface";
import { CreateClause } from "../../interfaces/database/clauses/create.clause.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";
import { LogService } from "../log/log.service";

export class DefinitionQueriesServices implements DdlQueries {
  private queryString: string;
  private driver: any;
  private driverType: Driver;
  constructor(options: QueriesOptions) {
    const { driver, driverType } = options;
    this.queryString = "";
    this.driverType = driverType;
    this.driver = driver;
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString ?? "", (error: any, rows: any) => {
        if (error) {
          reject(error);
          return;
        }
        if (this.driverType == "mssql") {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }

  private async getExistingColumns(tableName: string): Promise<string[]> {
    this.queryString = `SHOW COLUMNS FROM ${tableName} `;
    const result = await this.execute();
    return result.map((row: any) => row.Field);
  }

  private async convertNewColumns(model: Object) {
    const propertyKeys = Object.getOwnPropertyNames(model);
    const columns = [];

    const existingColumns = await this.getExistingColumns(
      model!.constructor.name
    );

    const filterExistingColumns = propertyKeys.filter(
      (propertyName) => !existingColumns.includes(propertyName)
    );

    for (const columnName of filterExistingColumns) {
      if (!existingColumns.includes(columnName)) {
        const metadata: string = Reflect.getMetadata(
          columnName,
          model!,
          columnName
        );
        if (metadata.includes("FOREIGN") || metadata.includes("PRIMARY")) {
          columns.push(`ADD ${metadata}`);
        } else {
          this.driverType == "mysql"
            ? columns.push(`ADD COLUMN ${metadata}`)
            : columns.push(`ADD ${metadata}`);
        }
      }
    }

    return columns;
  }

  private async extractDataFromModel(model: Object, alter?: boolean) {
    const propertyKeys = Object.getOwnPropertyNames(model);
    const columns = [];
    const foreignKeys = new Set<string>();

    for (const key of propertyKeys) {
      const metadata: string = Reflect.getMetadata(`${key}`, model, key);
      const fk_metadata: string = Reflect.getMetadata(`fk_${key}`, model, key);

      if (metadata) {
        columns.push(`${alter ? "ADD COLUMN " : ""}${metadata} `);
      }

      if (metadata && fk_metadata && !foreignKeys.has(fk_metadata)) {
        columns.push(`${alter ? "ADD " : ""}${fk_metadata} `);
        foreignKeys.add(fk_metadata);
      }
    }
    return columns;
  }

  async create(options: CreateClause): Promise<void> {
    const { model, type, viewQuery, dbOrViewName, schema, newUser } = options;

    if (model && type == "TABLE") {
      const columns = await this.extractDataFromModel(model, false);
      this.queryString = `CREATE ${type} ${schema ? schema + "." : ""}${
        model.constructor.name
      } (${columns});`;
    }
    if (type == "DATABASE") {
      this.queryString = `CREATE ${type}  ${dbOrViewName}`;
    }
    if (type == "VIEW") {
      this.queryString = `CREATE ${type}  ${dbOrViewName} AS ${viewQuery}`;
    }
    if (type == "USER") {
      const { password, username, host } = newUser!;
      if (this.driverType == "mysql") {
        this.queryString = `CREATE ${type}  ${username}@${host} IDENTIFIED BY ${password}`;
      }
      if (this.driverType == "mssql") {
        this.queryString = `CREATE LOGIN  ${username}  WITH PASSWORD = ${password}`;
      }
    }
    try {
      await this.execute();
    } catch (error: any) {
      const { code, message } = error;
      if (code == "ER_EMPTY_QUERY") {
        return LogService.show({
          message: "You must specify the [ MODEL ] that you want create.",
          type: "WARNING",
        });
      }
      if (code == "ER_DUP_FIELDNAME") {
        LogService.show({
          message: `Failed to create ${
            model!.constructor.name
          }, Reason:${code}.`,
          type: "ERROR",
        });
        return LogService.show({
          message: `Executing: ${this.queryString}`,
          type: "ERROR",
        });
      }
      if (
        code == "ER_TABLE_EXISTS_ERROR" ||
        message.includes("There is already an object named")
      ) {
        const newColumns = await this.convertNewColumns(model!);
        if (newColumns.length > 0) {
          await this.alter({ columns: newColumns, model: model!, schema });
        }
      } else {
        LogService.show({
          message: `An ocurred error creating ${type} ${
            type == "TABLE" ? model!.constructor.name : ""
          }: ${code},  ${message}`,
          type: "ERROR",
        });
        return LogService.show({
          message: `Executing: ${this.queryString}`,
          type: "ERROR",
        });
      }
    }
  }
  async alter(options: AlterClause): Promise<any> {
    const { columns, model, schema } = options;
    this.queryString = `ALTER TABLE ${schema ? schema + "." : ""}${
      model.constructor.name
    } ${columns} `;
    try {
      await this.execute();
    } catch (error: any) {
      const { code, sqlMessage, message, precedingErrors } = error;
      if (code == "ER_DUP_FIELDNAME") {
        return LogService.show({
          message: `${sqlMessage} in ${model.constructor.name}, skipping...`,
          type: "WARNING",
        });
      }
      if (precedingErrors) {
        return LogService.show({
          message: `${precedingErrors[0]} omiting... `,
          type: "WARNING",
        });
      }
      return LogService.show({
        message: `Alter table failed Reason: ${code}, ${message} `,
        type: "ERROR",
      });
    }
  }
  drop(): this {
    throw new Error("Method not implemented.");
  }
  rename(): this {
    throw new Error("Method not implemented.");
  }
  truncate(): this {
    throw new Error("Method not implemented.");
  }
  comment(): this {
    throw new Error("Method not implemented.");
  }
}
