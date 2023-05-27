import "reflect-metadata";
import {
  DatabaseAdapter,
  DatabaseKeys,
  MySqlService,
  QueriesAdapter,
  SqlServerService,
} from "./core/core";
import { OctopusOptions } from "./core/interfaces/app/octopus.options.interface";
import { Driver } from "./core/types/drivers/drivers.types";
import { PackageMetadata } from "./core/decorators/packageMetadata/packageMetada.decorator";
import { ErrorService } from "./core/services/log/error.service";
import { SqlModel } from "./core/interfaces/database/misc/sqlModel.interface";

export class OctopusQL {
  instance: Promise<QueriesAdapter>;
  driverType: Driver;
  constructor(options: OctopusOptions) {
    const { credentials, driverType, customDriver } = options;
    this.driverType = driverType;
    if ((driverType == "mysql" || driverType == "mssql") && !credentials) {
      throw ErrorService.factory(
        "credentials_empty",
        `Error: Credentials are required when using ${driverType} driver.`
      );
    }
    if (driverType == "custom" && !customDriver) {
      throw ErrorService.factory(
        "custom_driver_empty",
        `You must especify the custom driver that you want use.`
      );
    }
    this.instance = this.chooseDriver(driverType, credentials!);
  }
  @PackageMetadata({
    message: `Using`,
    type: "INFO",
    functionParams: 0,
  })
  async chooseDriver(
    driverType: Driver,
    credentials: DatabaseKeys,
    customDriver?: DatabaseAdapter
  ) {
    if (driverType == "mysql") {
      const mysql = new MySqlService(credentials!);

      await this.startConnection(mysql);

      return mysql.instance;
    }
    if (driverType == "mssql") {
      const mssql = new SqlServerService(credentials!);
      await this.startConnection(mssql);
      return mssql.instance;
    } else {
      try {
        if (customDriver) {
          await this.startConnection(customDriver);
          if (customDriver.instance) {
            return customDriver.instance;
          } else {
            throw ErrorService.factory(
              "driver_incorrectly_implemented",
              "Custom driver instance is undefined"
            );
          }
        }

        throw ErrorService.factory(
          "driver_incorrectly_implemented",
          "Custom driver is not provided"
        );
      } catch (error: any) {
        throw ErrorService.factory("driver_incorrectly_implemented", error);
      }
    }
  }
  private startConnection = async (driver: DatabaseAdapter) => driver.connect();

  async registerSchemas(instance: Promise<QueriesAdapter>, models: SqlModel[]) {
    const { modeling } = await instance;
    for (const model in models)
      await modeling.create({
        type: "TABLE",
        model: models[model],
      });
    try {
    } catch (error: any) {
      ErrorService.factory("REGISTER_SCHEMA_ERROR", error);
    }
  }
}
