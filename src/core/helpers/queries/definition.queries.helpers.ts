import { CreateClause } from "../../interfaces/database/clauses/create.clause.interface";
import { LogService } from "../../services/log/log.service";
import { DefinitionQueriesServices } from "../../services/queries/definition.queries.service";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";

export class DefinitionQueriesHelpers {
  private queryString: string;
  service: DefinitionQueriesServices;
  driver: any;
  driverType: Driver;
  constructor(options: QueriesOptions, service: DefinitionQueriesServices) {
    const { driver, driverType } = options;
    this.queryString = "";
    this.service = service;
    this.driverType = driverType;
    this.driver = driver;
  }

  async execute(): Promise<any[]> {
    console.log(this.queryString);
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
  async getExistingColumns(
    tableName: string,
    _chema?: string
  ): Promise<string[]> {
    this.queryString = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}' `;
    const result = await this.execute();
    this.queryString = "";
    return result.map((row: any) => row.COLUMN_NAME);
  }

  async convertNewColumns(model: Object, schema?: string) {
    const propertyKeys = Object.getOwnPropertyNames(model);
    const columns = [];

    const existingColumns = await this.getExistingColumns(
      model!.constructor.name,
      schema
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

  extractDataFromModel(model: Object, alter?: boolean) {
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
  wantCreate(options: CreateClause) {
    const { dbOrViewName, newUser, type, model, schema, viewQuery } = options;
    if (model && type == "TABLE") {
      const columns = this.extractDataFromModel(model, false);
      console.log(columns);
      this.queryString = `CREATE ${type} ${schema ? schema + "." : ""}${
        model.constructor.name
      } ${columns}`;
    }
    if (type == "DATABASE") {
      this.queryString = `CREATE ${type}  ${dbOrViewName};`;
    }
    if (type == "VIEW") {
      this.queryString = `CREATE ${type}  ${dbOrViewName} AS ${viewQuery};`;
    }
    if (type == "USER") {
      const { password, username, host } = newUser!;
      if (this.driverType == "mysql") {
        this.queryString = `CREATE ${type}  ${username}@${host} IDENTIFIED BY ${password};`;
      }
      if (this.driverType == "mssql") {
        this.queryString = `CREATE LOGIN  ${username}  WITH PASSWORD = ${password};`;
      }
    }
    return this.queryString;
  }
  async manageCreateErrors(error: any, options: CreateClause) {
    const { type, model, schema } = options;
    const { code, message } = error;
    if (code == "ER_EMPTY_QUERY") {
      return LogService.show({
        message: "You must specify the [ MODEL ] that you want create.",
        type: "WARNING",
      });
    }

    if (
      code == "ER_TABLE_EXISTS_ERROR" ||
      message.includes("There is already an object named")
    ) {
      const newColumns = await this.convertNewColumns(model!, schema);
      if (newColumns.length > 0) {
        await this.service.alter({
          columns: newColumns,
          model: model!,
          schema,
        });
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
  manageAlterErrors(error: any, model: Object) {
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
