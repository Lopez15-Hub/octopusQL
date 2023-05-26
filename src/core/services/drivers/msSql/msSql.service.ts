import { ConnectionPool, Request } from "mssql";
import { DatabaseAdapter } from "../../../interfaces/adapters/database/database.adapter.interface";
import QueriesService from "../../queries/queries.service";
import MsSqlEnviroment from "../../../enviroments/database/msSql/msSql.enviroment";

export default class SqlServerService implements DatabaseAdapter {
  driver: ConnectionPool;
  instance: QueriesService;
  constructor(readonly keys: MsSqlEnviroment) {
    this.driver = new ConnectionPool({
      user: keys.user,
      password: keys.password,
      server: keys.host ?? "",
      database: keys.database,
    });
    this.instance = new QueriesService({
      driver: new Request(this.driver),
      driverType: "mssql",
    });
  }

  async connect() {
    try {
      await this.driver.connect();
    } catch (error) {
      throw new Error(`Error al conectar: ${error}`);
    }
  }
}
