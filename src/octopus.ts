import "reflect-metadata";

import {
  DatabaseKeys,
  MySqlService,
  QueriesAdapter,
  SqlServerService,
} from "./core/core";
import { OctopusOptions } from "./core/interfaces/app/octopus.options.interface";
import { Driver } from "./core/types/drivers/drivers.types";
import { PrintBefore } from "./core/decorators/logger/printBefore.decorator";

export class OctopusQL {
  instance: Promise<QueriesAdapter>;
  constructor(options: OctopusOptions) {
    const { credentials, driverType, customDriver } = options;
    if ((driverType == "mysql" || driverType == "mssql") && !credentials) {
      throw new Error(
        `Error: Credentials are required when using ${driverType} driver.`
      );
    }
    if (driverType == "custom" && !customDriver) {
      throw new Error(`You must especify the custom driver that you want use.`);
    }
    this.instance = this.chooseDriver(driverType, credentials!);
  }
  @PrintBefore({
    message: "Using ",
    type: "info",
    functionParams: 0,
  })
  async chooseDriver(driverType: Driver, credentials: DatabaseKeys) {
    if (driverType == "mysql") {
      return new MySqlService(credentials!).instance;
    }
    if (driverType == "mssql") {
      const mssql = new SqlServerService(credentials!);
      await this.connectToSqlServer(mssql);
      return mssql.instance;
    } else {
      return new MySqlService(credentials!).instance;
    }
  }

  connectToSqlServer = async (driver: SqlServerService) => driver.connect();
}
