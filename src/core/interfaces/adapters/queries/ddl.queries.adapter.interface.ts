import { SqlColumn } from "../../database/parts/parts.interface";

export interface DdlQueries {
  execute(): Promise<any>;
  create(values: SqlColumn[]): this;
  alter(): Promise<any>;
  drop(): this;
  rename(): this;
  truncate(): this;
  comment(): this;
}
