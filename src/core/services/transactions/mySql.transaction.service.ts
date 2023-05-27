import { OctopusTransaction } from "../../interfaces/adapters/database/transaction.adapter.interface";
import { TransactionOptions } from "../../interfaces/database/options/transaction.options.interface";
import { ErrorService } from "../log/error.service";
import { LogService } from "../log/log.service";
import { Connection } from "mysql";
import { MySqlService } from "../services";
export class MySqlTransaction implements OctopusTransaction {
  private connection: Connection;
  private operations: Promise<any>[];
  constructor(options: TransactionOptions) {
    const { keys, operations } = options;
    this.connection = new MySqlService(keys).driver;
    this.operations = operations;
  }
  async start(): Promise<any> {
    if (this.connection) {
      try {
        this.connection.beginTransaction();

        for (const operation of this.operations) await operation;
        this.connection.commit();

        LogService.show({
          message: "Transaction completed.",
          type: "SUCCESS",
        });
      } catch (error: any) {
        this.connection.rollback();
        ErrorService.factory("SQL_MYSQL_TRS_FAILED_ROLLBACK", error);
      } finally {
        this.connection.end();
      }
    } else {
      ErrorService.factory("SQL_MYSQL_CONNECTION_EMPTY");
    }
  }
}
