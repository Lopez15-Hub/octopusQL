import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { CreateClause } from "../../interfaces/database/clauses/create.clause.interface";
import { DefinitionOptions } from "../../interfaces/database/queriesOptions/definition.options.interface";

export class DefinitionQueriesServices implements DdlQueries {
  private queryString: any;
  private driver: any;
  private useMsDriver?: boolean;
  private schema?: string;
  constructor(options: DefinitionOptions) {
    const { useSchema, schema, driver, useMsDriver } = options;
    this.queryString = "";
    this.driver = driver;
    this.useMsDriver = useMsDriver;
    if (!useSchema && schema) {
      throw new Error(
        "Error: Cannot provide a schema when useSchema is false."
      );
    }

    if (useSchema) {
      this.schema = schema;
    }
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
          reject(error);
          return;
        }
        if (this.useMsDriver) {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }
  async create(options: CreateClause): Promise<void> {
    const { model, type } = options;
    this.queryString = `CREATE ${type} IF NOT EXISTS ${
      this.schema ? this.schema + "." : ""
    } ${model.constructor.name} ${model} `;
    await this.execute();
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
