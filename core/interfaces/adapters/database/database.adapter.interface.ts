import { DatabaseKeys } from '../../database/keys/keys.interface';
import { QueriesAdapter } from '../queries/queries.adapter.interface';

export interface DatabaseAdapter {
  readonly keys: DatabaseKeys;
  connect(): void;
  instance(table: string): Promise<QueriesAdapter> | QueriesAdapter;
}
