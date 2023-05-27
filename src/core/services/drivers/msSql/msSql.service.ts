import { ConnectionPool, Request } from "mssql";
import { DatabaseAdapter } from "../../../interfaces/adapters/database/database.adapter.interface";
import QueriesService from "../../queries/queries.service";
import MsSqlEnviroment from "../../../enviroments/database/msSql/msSql.enviroment";
import { LogService } from "../../log/log.service";

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
      LogService.show({
        message: `Connected to database ${this.keys.database}`,
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
}
