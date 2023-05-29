import { OctopusTransaction } from "../../interfaces/adapters/database/transaction.adapter.interface";
import { TransactionOptions } from "../../interfaces/database/options/transaction.options.interface";
import { ErrorService } from "../log/error.service";
import { LogService } from "../log/log.service";
import { Transaction, ConnectionPool } from "mssql";
import { SqlServerService } from "../services";
export class MsTransaction implements OctopusTransaction {
  private connection: ConnectionPool;
  private operations: Promise<any>[];
  constructor(options: TransactionOptions) {
    const { keys, operations } = options;
    this.connection = new SqlServerService(keys).driver;
    this.operations = operations;
  }
  async start(): Promise<any> {
    try {
      // Conectar a la base de datos
      await this.connection.connect();

      // Iniciar la transacción
      const transaction = new Transaction(this.connection);
      await transaction.begin();

      try {
        for (const operation of this.operations) await operation;

        await transaction.commit();

        LogService.show({
          message: "Transaction completed.",
          type: "SUCCESS",
        });
      } catch (error: any) {
        await transaction.rollback();
        ErrorService.factory("SQL_MSSQL_TRS_FAILED_ROLLBACK", error);
      } finally {
        await this.connection.close();
      }
    } catch (error: any) {
      ErrorService.factory("MS_SQL_CONN_ERR", error);
    }
  }
}
