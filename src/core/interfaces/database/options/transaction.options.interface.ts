import { DatabaseKeys } from "../database.interface";

export interface TransactionOptions {
  keys: DatabaseKeys;
  operations: Promise<any>[];
}
