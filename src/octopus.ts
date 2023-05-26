import "reflect-metadata";

import {
  DatabaseKeys,
  MySqlService,
  QueriesAdapter,
  SqlServerService,
} from "./core/core";
import { OctopusOptions } from "./core/interfaces/app/octopus.options.interface";
import { Driver } from "./core/types/drivers/drivers.types";

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

  async chooseDriver(driverType: Driver, credentials: DatabaseKeys) {
    if (driverType == "mysql") {
      console.log("Database selected: MySql");
      return new MySqlService(credentials!).instance;
    }
    if (driverType == "mssql") {
      console.log("Database selected: MsSql");
      const mssql = new SqlServerService(credentials!);
      await this.connectToSqlServer(mssql);
      return mssql.instance;
    } else {
      console.log("Database selected: Custom");

      return new MySqlService(credentials!).instance;
    }
  }

  connectToSqlServer = async (driver: SqlServerService) => driver.connect();
}
