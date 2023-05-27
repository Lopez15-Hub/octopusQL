import { SelectClause } from "../../core";
import { DmlQueries } from "../../interfaces/adapters/queries/dml.queries.adapter.interface";
import ConditionalsQueriesService from "./conditionals.queries.service";
import { Driver } from "../../types/drivers/drivers.types";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { DeleteClause } from "../../interfaces/database/clauses/dml/delete.clause.interface";
import { NotImplemented } from "../../decorators/notImplemented/notImplemented.decorator";
import { UpdateClause } from "../../interfaces/database/clauses/dml/update.clause.interface";

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

  select(options: SelectClause) {
    const { from, values, useDistinct } = options;
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

  update(options: UpdateClause) {
    const { from, model } = options;
    const modelValues = Object.entries(model)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");

    this.queryString = `UPDATE ${
      from.schema ? from.schema + "." + from.table : from.table
    } SET  ${modelValues}`;
    return new ConditionalsQueriesService({
      queryString: this.queryString,
      driver: this.driver,
      useMsDriver: this.driverType == "mssql" ? true : false,
    });
  }
  @NotImplemented
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
  @NotImplemented
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
