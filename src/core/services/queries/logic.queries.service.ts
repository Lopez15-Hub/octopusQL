import { LogicQueries } from "../../interfaces/adapters/queries/logic.queries.adapter.interface";
import { LogicOptions } from "../../interfaces/database/options/logic.options.interface";

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

  and(condition: string) {
    this.queryString = `${this.queryString} AND '${condition}'`;
    return this;
  }

  or(condition: string) {
    this.queryString = `${this.queryString} OR '${condition}'`;
    return this;
  }

  groupBy(condition: string) {
    this.queryString = `${this.queryString} GROUP BY '${condition}' `;
    return this;
  }

  orderBy(condition: string) {
    this.queryString = `${this.queryString} ORDER BY '${condition}' `;
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
  like(pattern: string): this {
    this.queryString = `${this.queryString} LIKE '${pattern}'`;
    return this;
  }
}
