import { SelectClause } from "../../core";
import { DmlQueries } from "../../interfaces/adapters/queries/dml.queries.adapter.interface";
import ConditionalsQueriesService from "./conditionals.service";
import { Driver } from "../../types/drivers/drivers.types";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { DeleteClause } from "../../interfaces/database/clauses/dml/delete.clause.interface";
import { NotImplemented } from "../../decorators/notImplemented/notImplemented.decorator";
import { Deprecated } from "../../decorators/deprecated/deprecated.decorator";

export class ManageQueriesService implements DmlQueries {
  private queryString: any;
  private driver: any;
  private driverType: Driver;
  constructor(options: QueriesOptions) {
    const { driver, driverType } = options;
    this.queryString = "";
    this.driver = driver;
    this.driverType = driverType;
  }

  select({ values, useDistinct = false, from }: SelectClause) {
    this.queryString = `SELECT ${
      useDistinct ? "DISTINCT" : ""
    } ${values} FROM ${
      from.schema ? from.schema + "." + from.table : from.table
    }`;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql",
    });
  }
  // todo: Revisar condiciones de schema.
  delete({ from }: DeleteClause) {
    this.queryString = `DELETE FROM ${
      from.schema ? from.schema + "." + from.table : from.table
    }`;
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

    this.queryString = `UPDATE ${
      "HERE SCHEMA CONDITION" ? "dbo" : ""
    }.${""} SET ${setClause} `;
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
    // todo: Complete insert
    this.queryString = `INSERT INTO ${
      "HERE SCHEMA CONDITION" ? "dbo" : ""
    }.${"tablename"} ${columns} VALUES ${values}  `;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  @NotImplemented
  merge() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  @Deprecated
  public explainPlan() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  @NotImplemented
  public lockTable() {
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
}
