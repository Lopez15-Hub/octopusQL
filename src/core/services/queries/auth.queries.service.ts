import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";

export class AuthQueriesService implements DclQueries {
  options: QueriesOptions;
  constructor(options: QueriesOptions) {
    this.options = options;
  }
  grant(): this {
    throw new Error("Method not implemented.");
  }
  revoke(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  execute(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
