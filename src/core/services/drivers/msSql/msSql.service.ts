import { ConnectionPool, Request } from "mssql";
import { DatabaseAdapter } from "../../../interfaces/adapters/database/database.adapter.interface";
import QueriesService from "../../queries/queries.service";
import { QueriesAdapter } from "../../../interfaces/adapters/adapters.interface";
import MsSqlEnviroment from "../../../enviroments/database/msSql/msSql.enviroment";

export default class SqlServerService implements DatabaseAdapter {
  driver: ConnectionPool;

  constructor(readonly keys: MsSqlEnviroment) {
    this.driver = new ConnectionPool({
      user: keys.user,
      password: keys.password,
      server: keys.host ?? "",
      database: keys.database,
    });
  }

  async connect() {
    try {
      await this.driver.connect();
    } catch (error) {
      throw new Error(`Error al conectar: ${error}`);
    }
  }

  async instance(table: string): Promise<QueriesAdapter> {
    try {
      await this.connect();
      return new QueriesService({
        tableName: table,
        driver: new Request(this.driver),
        driverType: "mssql",
      });
    } catch (error) {
      console.error("Error en la conexión:", error);
      throw error;
    }
  }

  close = () => {
    throw new Error("Method not implemented.");
  };
}
