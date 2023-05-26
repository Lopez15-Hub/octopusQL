import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { GrantClause } from "../../interfaces/database/clauses/grant.clause.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";
import { LogService } from "../log/log.service";

export class AuthQueriesService implements DclQueries {
  private queryString: string;
  private driver: any;
  private driverType: Driver;
  constructor(options: QueriesOptions) {
    const { driver, driverType } = options;
    this.queryString = "";
    this.driverType = driverType;
    this.driver = driver;
  }
  async grant(options: GrantClause): Promise<any> {
    const { privileges, on, to, allowAll } = options;
    this.queryString = `GRANT ${
      allowAll ? "ALL PRIVILEGES" : privileges
    } ON ${on} TO ${to}`;
    try {
      await this.execute();
    } catch (error: any) {
      throw new Error(error);
    }
  }
  revoke(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
      
          reject(error);
          return LogService.show({
            message: `An ocurred error creating executing : ${error}`,
            type: "ERROR",
          });
        }
        if (this.driverType == "mssql") {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
