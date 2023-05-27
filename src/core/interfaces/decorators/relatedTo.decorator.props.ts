import { DataTypesSql } from "../../types/dataTypes/dataTypesSql.types";
import { SqlModel } from "../database/misc/sqlModel.interface";

export interface RelatedToProps {
  model: SqlModel;
  type: DataTypesSql;
}
