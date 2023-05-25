import { SqlColumn } from '../../database/parts/parts.interface';
import { SelectClause } from '../../database/clauses/clauses.interface';

export interface QueriesAdapter {
  execute(): Promise<any>;
  createDatabase(): this;
  createTable(values: SqlColumn[]): this;
  select({ values, useDistinct }: SelectClause): this;
  update(columns: Object): this;
  delete(): this;
  insert(data: Object): this;
  where(condition: string): this;
  groupBy(condition: string): this;
  orderBy(condition: string): this;
  and(condition: string): this;
  or(condition: string): this;
}
