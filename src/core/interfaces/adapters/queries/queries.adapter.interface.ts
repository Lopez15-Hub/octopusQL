import { DmlQueries } from "./dml.queries.adapter.interface";
import { DdlQueries } from "./ddl.queries.adapter.interface";
import { DclQueries } from "./dcl.queries.adapter.interface";

export interface QueriesAdapter {
  query: DmlQueries;
  modeling: DdlQueries;
  auth: DclQueries;
}
