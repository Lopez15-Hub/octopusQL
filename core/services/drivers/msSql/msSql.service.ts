import sql from 'mssql';
import { DatabaseAdapter } from '../../../interfaces/adapters/database/database.adapter.interface';
import QueriesService from '../../queries/queries.service';
import { QueriesAdapter } from '../../../interfaces/adapters/adapters.interface';
import MsSqlEnviroment from '../../../enviroments/database/msSql/msSql.enviroment';

export default class SqlServerService implements DatabaseAdapter {
  private readonly sqlConfig: sql.config;

  driver: any;

  constructor(readonly keys: MsSqlEnviroment) {
    this.driver = sql;
    this.sqlConfig = {
      user: this.keys.user,
      password: this.keys.password,
      database: this.keys.database,
      server: `${this.keys.host}`,
      pool: this.keys.msPool,
      options: this.keys.msOptions,
    };
  }

  async connect() {
    try {
      await sql.connect(this.sqlConfig);
    } catch (error) {
      throw new Error(`Error al conectar: ${error}`);
    }
  }

  async instance(table: string): Promise<QueriesAdapter> {
    try {
      await this.connect();
      return new QueriesService(table, this.keys.database!, this.driver, true);
    } catch (error) {
      console.error('Error en la conexión:', error);
      throw error;
    }
  }

  close = () => {
    throw new Error('Method not implemented.');
  };
}
