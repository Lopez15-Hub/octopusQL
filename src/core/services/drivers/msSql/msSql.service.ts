import { ConnectionPool, Request } from "mssql";
import { DatabaseAdapter } from "../../../interfaces/adapters/database/database.adapter.interface";
import QueriesService from "../../queries/queries.service";
import MsSqlEnviroment from "../../../enviroments/database/msSql/msSql.enviroment";
import { LogService } from "../../log/log.service";
import { ErrorService } from "../../log/error.service";

export default class SqlServerService implements DatabaseAdapter {
  driver: ConnectionPool;
  instance: QueriesService;
  constructor(readonly keys: MsSqlEnviroment) {
    this.driver = new ConnectionPool({
      user: keys.user,
      password: keys.password,
      server: keys.host!,
      database: keys.database,
      pool: keys.msPool,
      options: keys.msOptions,
    });

    this.instance = new QueriesService({
      driver: new Request(this.driver),
      driverType: "mssql",
    });
  }
  close(): void {
    this.driver.close();
  }

  async connect() {
    try {
      const response = await this.driver.connect();

      if (response.connected) {
        console.log(response);
        LogService.show({
          message: `Connected to database ${this.keys.database}`,
          type: "SUCCESS",
        });
      }
    } catch (error: any) {
      const { code } = error;
      ErrorService.factory(
        "ERR_CONN_FAIL",
        `Connect to database failed reason: ${code}`
      );
    }
  }
}
