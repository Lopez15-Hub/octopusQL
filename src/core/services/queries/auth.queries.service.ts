import { SqlColumn } from "../../core";
import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";

export class AuthQueriesService implements DclQueries {
  grant(_: SqlColumn[]): this {
    throw new Error("Method not implemented.");
  }
  revoke(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  execute(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
