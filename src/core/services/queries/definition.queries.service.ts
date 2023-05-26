import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { CreateClause } from "../../interfaces/database/clauses/create.clause.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";

export class DefinitionQueriesServices implements DdlQueries {
  private queryString: string;
  private driver: any;
  private driverType: Driver;
  private schema?: string;
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
  async create(options: CreateClause): Promise<void> {
    const { model, type, viewQuery, dbOrViewName } = options;
    if (model && type == "TABLE") {
      this.queryString = `CREATE ${type} IF NOT EXISTS ${
        this.schema ? this.schema + "." : ""
      } ${model.constructor.name} ${model} `;
    }
    if (type == "DATABASE") {
      this.queryString = `CREATE ${type}  IF NOT EXISTS ${dbOrViewName}`;
    }
    if (type == "VIEW") {
      this.queryString = `CREATE ${type}  IF NOT EXISTS ${dbOrViewName} AS ${viewQuery}`;
    }
  }
  alter(): Promise<any> {
    throw new Error("Method not implemented.");
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
