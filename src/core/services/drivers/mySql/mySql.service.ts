import * as mysql from "mysql";
import QueriesService from "../../queries/queries.service";
import {
  DatabaseAdapter,
  QueriesAdapter,
} from "../../../interfaces/interfaces";
import MySqlEnviroment from "../../../enviroments/database/mySql/mySql.enviroment";
import { LogService } from "../../log/log.service";

export default class MySqlService implements DatabaseAdapter {
  driver: mysql.Connection;

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
  close(): void {
    this.driver.end();
  }
  instance: QueriesAdapter;

  async connect() {
    try {
      this.driver.connect();
      LogService.show({
        message: `Connected to database`,
        type: "SUCCESS",
      });
    } catch (error: any) {
      const { code } = error;
      LogService.show({
        message: `An ocurred error connecting to database: ${code}`,
        type: "SUCCESS",
      });
    }
  }

  closeConnection = () => this.driver.end();
}
