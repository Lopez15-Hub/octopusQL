import { QueriesAdapter } from "../../core";

import { DclQueries } from "../../interfaces/adapters/queries/dcl.queries.adapter.interface";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { DmlQueries } from "../../interfaces/adapters/queries/dml.queries.adapter.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { AuthQueriesService } from "./auth.queries.service";
import { DefinitionQueriesServices } from "./definition.queries.service";
import { ManageQueriesService } from "./manage.queries.service";

export default class QueriesService implements QueriesAdapter {
  query: DmlQueries;
  modeling: DdlQueries;
  auth: DclQueries;
  constructor(options: QueriesOptions) {
    this.query = new ManageQueriesService(options);
    this.auth = new AuthQueriesService(options);
    this.modeling = new DefinitionQueriesServices(options);
  }

}
