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

  private async getExistingColumns(
    tableName: string,
    schema?: string
  ): Promise<string[]> {
    this.queryString = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}' ${
      schema ? `AND TABLE_SCHEMA = '${schema}'` : ""
    };`;
    const result = await this.execute();
    return result.map((row: any) => row.COLUMN_NAME);
  }
  private async convertNewColumns(model: Object, schema?: string) {
    const propertyKeys = Object.getOwnPropertyNames(model);
    const existingColumns = await this.getExistingColumns(
      model!.constructor.name,
      schema
    );

    const filterColumns = propertyKeys.filter(
      (propertyName) => !existingColumns.includes(propertyName)
    );

    const columns = [];
    for (const key of filterColumns) {
      const metadata: string = Reflect.getMetadata(key, model!, key);
      columns.push(`ADD COLUMN ${metadata.replace("  ", " ")}`);
    }
    return columns;
  }

  private extractDataFromModel(model: Object, alter?: boolean) {
    const propertyKeys = Object.getOwnPropertyNames(model);
    const columns = [];
    for (const key of propertyKeys) {
      const metadata: string = Reflect.getMetadata(key, model, key);
      columns.push(
        `${alter ? "ADD COLUMN " : ""}${metadata.replace("  ", " ")}`
      );
    }
    return columns;
  }
  async create(options: CreateClause): Promise<void> {
    const { model, type, viewQuery, dbOrViewName, schema, newUser } = options;

    if (model && type == "TABLE") {
      const columns = this.extractDataFromModel(model, false);
      this.queryString = `CREATE ${type} ${schema ? schema + "." : ""} ${
        model.constructor.name
      } (${columns});`;
    }
    if (type == "DATABASE") {
      this.queryString = `CREATE ${type}  IF NOT EXISTS ${dbOrViewName}`;
    }
    if (type == "VIEW") {
      this.queryString = `CREATE ${type}  IF NOT EXISTS ${dbOrViewName} AS ${viewQuery}`;
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
      const { code } = error;
      if (code == "ER_EMPTY_QUERY") {
        return LogService.show({
          message: "You must specify a [ MODEL ]",
          type: "WARNING",
        });
      }

      if (code == "ER_TABLE_EXISTS_ERROR") {
        const newColumns = await this.convertNewColumns(model!, schema);
        if (newColumns.length > 0) {
          await this.alter({ columns: newColumns, model: model!, schema });
        }
      } else {
        return LogService.show({
          message: `An ocurred error creating ${type}: ${code}`,
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
      console.log("Columnas actualizadas");
    } catch (error: any) {
      const { code } = error;
      console.log("Ha ocurrido un error Intentando alterar: ", code);
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
