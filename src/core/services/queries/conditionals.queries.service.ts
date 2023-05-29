import { ConditionalsQueries } from "../../interfaces/adapters/queries/conditionals.queries.adapter.interface";
import { JoinClause } from "../../interfaces/database/clauses/join.clause.interface";
import { ConditionalOptions } from "../../interfaces/database/options/conditionals.options.interface";
import { ErrorService } from "../log/error.service";
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
    const { name: modelFromName } = modelFrom;
    const { name: modelToName } = modelTo;
    this.queryString += ` 
    LEFT JOIN ${modelToName} 
    ON ${modelToName}.${key} = ${modelFromName}.${key};
`;
    return this;
  }
  rightJoin(options: JoinClause): this {
    const { key, modelFrom, modelTo } = options;
    const { name: modelFromName } = modelFrom;
    const { name: modelToName } = modelTo;
    this.queryString += ` 
    RIGHT JOIN ${modelToName} 
    ON ${modelToName}.${key} = ${modelFromName}.${key};
`;
    return this;
  }
  groupBy(condition: string) {
    this.queryString += `GROUP BY '${condition}' `;
    return this;
  }
  like(pattern: string): this {
    this.queryString += `LIKE '${pattern}'`;
    return this;
  }

  orderBy(condition: string) {
    this.queryString += `ORDER BY '${condition}' `;
    return this;
  }
  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
          const { code } = error;
          reject(error);
          LogService.show({
            message: `Executing: ${this.queryString}`,
            type: "ERROR",
          });
          return ErrorService.factory(
            "COND_EXEC_ERR",
            `An ocurred error executing query, reason: ${code}`
          );
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
