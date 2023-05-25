import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { DmlQueries } from "../../interfaces/adapters/queries/dml.queries.adapter.interface";
import { SearchOptions } from "../../interfaces/database/queriesOptions/search.options.interface";
import { QueriesAdapter } from "../../interfaces/interfaces";
import { SearchQueriesService } from "./search.queries.service";

export default class QueriesService implements QueriesAdapter {
  queryString: any;

  databaseName: string;

  constructor(
    readonly tableName: string,
    databaseName: string,
    readonly driver: any,
    readonly useMsDriver?: boolean | undefined
  ) {
    this.tableName = tableName;
    this.queryString = "";
    this.databaseName = databaseName;
    this.useMsDriver = useMsDriver;
  }
  search(schema?: string): SearchQueriesService {
    return new SearchQueriesService({
      tableName: this.tableName,
      schema: schema,
      useSchema: schema ? true : false,
    });
  }
  auth(): DclQueries {
    throw new Error("Method not implemented.");
  }
  modeling(): DdlQueries {
    throw new Error("Method not implemented.");
  }
  execute(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
