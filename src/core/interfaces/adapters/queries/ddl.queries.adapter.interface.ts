import { CreateClause } from "../../database/clauses/create.clause.interface";

export interface DdlQueries {
  execute(): Promise<any>;
  create(options: CreateClause): Promise<void>;
  alter(columns:any): Promise<any>;
  drop(): this;
  rename(): this;
  truncate(): this;
  comment(): this;
}
