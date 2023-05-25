import { ConditionalsQueries } from "../../interfaces/adapters/queries/conditionals.queries.adapter.interface";
import { ConditionalOptions } from "../../interfaces/database/queriesOptions/conditionals.options.interface";
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
    this.queryString = `${this.queryString} WHERE ${condition}`;
    return new LogicQueriesService(this.queryString);
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
}
