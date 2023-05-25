import { Driver } from "../../types/drivers/drivers.types";
import { DatabaseAdapter, DatabaseKeys } from "../interfaces";

export interface OctopusOptions {
  credentials?: DatabaseKeys;
  customDriver?: DatabaseAdapter;
  driver: Driver;
}
