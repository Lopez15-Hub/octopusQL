import { QueriesAdapter } from "../../../core";
import { DatabaseKeys } from "../../database/keys/keys.interface";

export interface DatabaseAdapter {
  readonly keys: DatabaseKeys;
  readonly instance: QueriesAdapter;
  connect(): void;
  close(): void;
}
