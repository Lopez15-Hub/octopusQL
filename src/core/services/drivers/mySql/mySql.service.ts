import * as mysql from "mysql";
import QueriesService from "../../queries/queries.service";
import {
  DatabaseAdapter,
  QueriesAdapter,
} from "../../../interfaces/interfaces";
import MySqlEnviroment from "../../../enviroments/database/mySql/mySql.enviroment";

export default class MySqlService implements DatabaseAdapter {
  private readonly driver: mysql.Connection;

  constructor(readonly keys: MySqlEnviroment) {
    this.driver = mysql.createConnection({
      database: keys.database,
      host: keys.host,
      port: keys.port,
      password: keys.password,
      user: keys.user,
    });
    this.instance = new QueriesService({
      driver: this.driver,
      driverType: "mysql",
    });
  }
  instance: QueriesAdapter;

  async connect() {
    try {
      this.driver.connect();
      console.log("Base de datos conectada.");
    } catch (error) {
      throw new Error(`Error al conectar: ${error}`);
    }
  }

  close = () => this.driver.end();
}
