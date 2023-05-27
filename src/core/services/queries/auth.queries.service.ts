import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { GrantClause } from "../../interfaces/database/clauses/grant.clause.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";
import { ErrorService } from "../log/error.service";

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
      throw ErrorService.factory("grant_error", error);
    }
  }
  revoke(): Promise<any> {
    throw ErrorService.factory("oc_method_not_implemented");
  }
  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
          reject(error);
          throw ErrorService.factory(
            "execute_query_failed",
            `An ocurred error executing : ${error}`
          );
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
