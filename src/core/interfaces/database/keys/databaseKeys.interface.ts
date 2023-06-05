import { MsSqlOptions } from "./msSqlOptions.interface";
import { MsSqlPool } from "./msSqlPool.interface";

export interface DatabaseKeys {
  host: string | undefined;
  domain?: string | undefined;
  database: string | undefined;
  user: string | undefined;
  password: string | undefined;
  port?: number;
  msOptions?: MsSqlOptions;
  msPool?: MsSqlPool;
}
