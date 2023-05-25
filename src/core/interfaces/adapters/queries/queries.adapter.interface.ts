import { SearchQueriesService } from "../../../services/queries/search.queries.service";
import { AuthQueriesService } from "../../../services/queries/auth.queries.service";
import { DefinitionQueriesServices } from "../../../services/queries/definition.queries.service";

// export interface QueriesAdapter {
//   execute(): Promise<any>;
//   createDatabase(): this;
//   createTable(values: SqlColumn[]): this;
//   select({ values, useDistinct }: SelectClause): this;
//   insert(data: Object): this;
//   update(columns: Object): this;
//   delete(): this;
//   where(condition: string): this;
//   groupBy(condition: string): this;
//   orderBy(condition: string): this;
//   and(condition: string): this;
//   or(condition: string): this;
// }
export interface QueriesAdapter {
  search(schema?: string): SearchQueriesService;
  auth(): AuthQueriesService;
  modeling(): DefinitionQueriesServices;
  execute(): Promise<any[]>;
}
