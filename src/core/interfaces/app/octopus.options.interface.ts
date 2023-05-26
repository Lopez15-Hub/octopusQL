import { Driver } from "../../types/drivers/drivers.types";
import {  DatabaseKeys, QueriesAdapter } from "../interfaces";

export interface OctopusOptions {
  credentials?: DatabaseKeys;
  customDriver?: QueriesAdapter;
  driverType: Driver;
}
