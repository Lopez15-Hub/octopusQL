import { Driver } from "../../../types/drivers/drivers.types";
import { Request } from "mssql";
import * as mysql from "mysql";

export interface QueriesOptions {
  readonly driver: Request | mysql.Connection | "custom";
  readonly driverType: Driver;
}
