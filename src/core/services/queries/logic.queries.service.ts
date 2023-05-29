import { LogicQueries } from "../../interfaces/adapters/queries/logic.queries.adapter.interface";
import { LogicOptions } from "../../interfaces/database/options/logic.options.interface";
import { Order } from "../../types/database/order.type";
import { ErrorService } from "../log/error.service";
import { LogService } from "../log/log.service";

export class LogicQueriesService implements LogicQueries {
  private queryString: any;
  private driver: any;
  private useMsDriver?: boolean;
  constructor(options: LogicOptions) {
    const { driver, queryString, useMsDriver } = options;
    this.queryString = queryString;
    this.driver = driver;
    this.useMsDriver = useMsDriver;
  }

  and(condition: string) {
    this.queryString = `${this.queryString} AND '${condition}'`;
    return this;
  }

  or(condition: string) {
    this.queryString = `${this.queryString} OR '${condition}'`;
    return this;
  }

  lessThan(condition: string): this {
    this.queryString = `${this.queryString} < '${condition}'`;
    return this;
  }
  equalsTo(condition: string): this {
    this.queryString = `${this.queryString} = '${condition}'`;
    return this;
  }
  notEqualsTo(condition: string): this {
    this.queryString = `${this.queryString} != '${condition}'`;
    return this;
  }
  higherThan(condition: string): this {
    this.queryString = `${this.queryString} > '${condition}'`;
    return this;
  }
  groupBy(condition: string) {
    this.queryString += `GROUP BY ${condition} `;
    return this;
  }
  like(pattern: string): this {
    this.queryString += `LIKE ${pattern}`;
    return this;
  }

  orderBy(condition: string, order: Order) {
    this.queryString += `ORDER BY '${condition}' ${order ?? ""} `;
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
