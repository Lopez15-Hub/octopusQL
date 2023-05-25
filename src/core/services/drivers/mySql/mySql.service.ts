import * as mysql from "mysql";
import QueriesService from "../../queries/queries.service";
import { DatabaseAdapter } from "../../../interfaces/interfaces";
import MySqlEnviroment from "../../../enviroments/database/mySql/mySql.enviroment";

export default class MySqlService implements DatabaseAdapter {
  private readonly driver: mysql.Connection;

  tableName: string;

  queryString: string;

  constructor(readonly keys: MySqlEnviroment) {
    this.driver = mysql.createConnection({
      database: keys.database,
      host: keys.host,
      port: keys.port,
      password: keys.password,
      user: keys.user,
    });
    this.tableName = "";
    this.queryString = "";
  }

  connect() {
    try {
      this.driver.connect();
    } catch (error) {
      throw new Error(`Error al conectar: ${error}`);
    }
  }

  instance = (table: string) =>
    new QueriesService({
      driver: this.driver,
      driverType: "mysql",
      tableName: table,
    });

  close = () => this.driver.end();
}
