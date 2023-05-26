import { SqlModel } from "../../misc/sqlModel.interface";
import { FromOptions } from "../../options/from.options.interface";
export interface UpdateClause {
  from: FromOptions;
  model: SqlModel;
}
