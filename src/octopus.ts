import { MySqlService, SqlServerService } from "./core/core";
import { OctopusOptions } from "./core/interfaces/app/octopus.options.interface";
import { DriverService } from "./core/types/drivers/driver.service.types";

export class OctopusQL {
  driver?: DriverService;
  constructor(options: OctopusOptions) {
    const { credentials, driver, customDriver } = options;
    if ((driver == "mysql" || driver == "mssql") && !credentials) {
      throw new Error(
        `Error: Credentials are required when using ${driver} driver.`
      );
    }
    if (driver == "custom" && !customDriver) {
      throw new Error(`You must especify the custom driver that you want use.`);
    }
    switch (driver) {
      case "mssql":
        this.driver = new SqlServerService(credentials!);
        break;
      case "mysql":
        this.driver = new MySqlService(credentials!);
        break;
      default:
        this.driver = customDriver;
    }
  }
  getInstanceOf = async (table: string) => this.driver!.instance(table);
}
