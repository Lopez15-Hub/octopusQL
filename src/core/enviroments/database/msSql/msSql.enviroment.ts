import { DatabaseKeys } from '../../../interfaces/database/database.interface';
import { MsSqlOptions } from '../../../interfaces/database/keys/msSqlOptions.interface';

export default class MsSqlEnviroment implements DatabaseKeys {
  host: string | undefined;

  database: string | undefined;

  user: string | undefined;

  password: string | undefined;

  port?: number | undefined;

  msOptions?: MsSqlOptions | undefined;

  msPool?: any;

  constructor(keys: DatabaseKeys) {
    this.host = keys.host;
    this.database = keys.database;
    this.msOptions = keys.msOptions;
    this.msPool = keys.msPool;
    this.password = keys.password;
    this.port = keys.port;
    this.user = keys.user;
  }
}
