import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { QueriesOptions } from "../../interfaces/database/queriesOptions/queries.options.interface";
import { QueriesAdapter } from "../../interfaces/interfaces";
import { Driver } from "../../types/drivers/drivers.types";
import { SearchQueriesService } from "./search.queries.service";

export default class QueriesService implements QueriesAdapter {
  private tableName: string;
  private driver: any;
  private driverType: Driver;
  constructor(options: QueriesOptions) {
    const { tableName, driver, driverType } = options;
    this.tableName = tableName;
    this.driver = driver;
    this.driverType = driverType;
  }
  query(schema?: string): SearchQueriesService {
    return new SearchQueriesService({
      tableName: this.tableName,
      schema: schema,
      useSchema: schema ? true : false,
      driver: this.driver,
      driverType: this.driverType,
    });
  }
  auth(): DclQueries {
    throw new Error("Method not implemented.");
  }
  modeling(): DdlQueries {
    throw new Error("Method not implemented.");
  }
}
