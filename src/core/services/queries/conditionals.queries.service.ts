import { ConditionalsQueries } from "../../interfaces/adapters/queries/conditionals.queries.adapter.interface";
import { JoinClause } from "../../interfaces/database/clauses/join.clause.interface";
import { ConditionalOptions } from "../../interfaces/database/options/conditionals.options.interface";
import { LogService } from "../log/log.service";
import { LogicQueriesService } from "./logic.queries.service";

export default class ConditionalsQueriesService implements ConditionalsQueries {
  private queryString: any;
  private driver: any;
  private useMsDriver?: boolean;
  constructor(options: ConditionalOptions) {
    const { driver, queryString, useMsDriver } = options;
    this.queryString = queryString;
    this.driver = driver;
    this.useMsDriver = useMsDriver;
  }
  where(condition: string) {
    this.queryString += ` WHERE ${condition}`;
    return new LogicQueriesService({
      driver: this.driver,
      queryString: this.queryString,
      useMsDriver: this.useMsDriver,
    });
  }
  join(options: JoinClause): this {
    const { key, modelFrom, modelTo } = options;
    const { name: modelFromName } = modelFrom;
    const { name: modelToName } = modelTo;
    this.queryString += ` 
    JOIN ${modelToName} 
    ON ${modelToName}.${key} = ${modelFromName}.${key};
`;
    return this;
  }
  leftJoin(options: JoinClause): this {
    const { key, modelFrom, modelTo } = options;
    const { name: modelFromName } = modelFrom.constructor;
    const { name: modelToName } = modelTo.constructor;
    this.queryString += ` 
    LEFT JOIN ${modelToName} 
    ON ${modelToName}.${key} = ${modelFromName}.${key};
`;
    return this;
  }
  rightJoin(options: JoinClause): this {
    const { key, modelFrom, modelTo } = options;
    const { name: modelFromName } = modelFrom.constructor;
    const { name: modelToName } = modelTo.constructor;
    this.queryString += ` 
    RIGHT JOIN ${modelToName} 
    ON ${modelToName}.${key} = ${modelFromName}.${key};
`;
    return this;
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
          reject(error);
          return LogService.show({ message: `${error}`, type: "ERROR" });
        }
        if (this.useMsDriver) {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
