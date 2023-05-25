import { Driver } from "../../../types/drivers/drivers.types";

export interface QueriesOptions {
  tableName: string;
  driver: any;
  driverType: Driver;
}
