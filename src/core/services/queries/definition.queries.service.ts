import { SqlColumn } from "../../core";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";

export class DefinitionQueriesServices implements DdlQueries {
  execute(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  create(_: SqlColumn[]): this {
    throw new Error("Method not implemented.");
  }
  alter(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  drop(): this {
    throw new Error("Method not implemented.");
  }
  rename(): this {
    throw new Error("Method not implemented.");
  }
  truncate(): this {
    throw new Error("Method not implemented.");
  }
  comment(): this {
    throw new Error("Method not implemented.");
  }
}
