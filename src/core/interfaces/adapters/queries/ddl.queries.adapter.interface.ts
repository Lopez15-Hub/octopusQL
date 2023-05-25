import { CreateClause } from "../../database/clauses/create.clause.interface";

export interface DdlQueries {
  execute(): Promise<any>;
  create(options: CreateClause): Promise<void>;
  alter(): Promise<any>;
  drop(): this;
  rename(): this;
  truncate(): this;
  comment(): this;
}
