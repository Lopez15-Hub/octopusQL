import { SqlColumn } from "../../database/parts/parts.interface";

export interface DclQueries {
  grant(values: SqlColumn[]): this;
  revoke(): Promise<any>;
  execute(): Promise<any>;
}
