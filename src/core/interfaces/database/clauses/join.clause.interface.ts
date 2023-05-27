import { SqlModel } from "../misc/sqlModel.interface";

export interface JoinClause {
  modelFrom: SqlModel;
  modelTo: SqlModel;
  key: string;
}
