import { SqlModel } from "../misc/sqlModel.interface";

export interface JoinClause {
  modelFrom: Function;
  modelTo: Function;
  key: string;
}
