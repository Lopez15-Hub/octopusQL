import { DatabaseKeys } from "../../../interfaces/database/keys/databaseKeys.interface";

export default class PostgreSqlEnviroment implements DatabaseKeys {
  host: string | undefined;

  database: string | undefined;

  user: string | undefined;

  password: string | undefined;

  port?: number | undefined;

  constructor(keys: DatabaseKeys) {
    this.host = keys.host;
    this.database = keys.database;
    this.password = keys.password;
    this.port = keys.port;
    this.user = keys.user;
  }
}
