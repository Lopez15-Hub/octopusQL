import { SelectClause } from "../../core";
import { DmlQueries } from "../../interfaces/adapters/queries/dml.queries.adapter.interface";
import ConditionalsQueriesService from "./conditionals.service";
import { SearchOptions } from "../../interfaces/database/queriesOptions/search.options.interface";
import { Driver } from "../../types/drivers/drivers.types";

export class SearchQueriesService implements DmlQueries {
  private queryString: any;
  private tableName: string;
  private schema?: string;
  private driver: any;
  private driverType: Driver;
  private useSchema?: boolean;
  constructor(options: SearchOptions) {
    const { tableName, useSchema, schema, driver, driverType } = options;
    this.tableName = tableName;
    this.queryString = "";
    this.useSchema = useSchema;
    this.driver = driver;
    this.driverType = driverType;
    if (!useSchema && schema) {
      throw new Error(
        "Error: Cannot provide a schema when useSchema is false."
      );
    }

    if (useSchema) {
      this.schema = schema;
    }
  }

  select({ values, useDistinct = false }: SelectClause) {
    this.queryString = `SELECT ${
      useDistinct ? "DISTINCT" : ""
    } ${values} FROM  ${this.useSchema ? this.schema : this.tableName}.${
      this.tableName
    }`;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }

  delete() {
    this.queryString = `DELETE FROM ${
      this.useSchema ? "dbo" : this.tableName
    }.${this.tableName}`;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }

  update(columns: Object) {
    const setClause = Object.entries(columns)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");

    this.queryString = `UPDATE ${this.useSchema ? "dbo" : this.tableName}.${
      this.tableName
    } SET ${setClause} `;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }

  insert(data: Object) {
    const columns = `(${Object.keys(data).join(",")})`;
    const values = `(${Object.values(data)
      .map((val) => `'${val}'`)
      .join(",")})`;

    this.queryString = `INSERT INTO ${
      this.useSchema ? "dbo" : this.tableName
    }.${this.tableName} ${columns} VALUES ${values}  `;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }

  merge() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  explainPlan() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  lockTable() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
}
