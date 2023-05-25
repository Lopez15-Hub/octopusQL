import { SqlServerService, MySqlService, DatabaseAdapter } from "../../core";

export type DriverService = SqlServerService | MySqlService | DatabaseAdapter;
