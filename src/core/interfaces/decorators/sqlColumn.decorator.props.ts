import { DataTypesSql } from "../../types/dataTypes/dataTypesSql.types";
import { SqlModel } from "../database/misc/sqlModel.interface";

export interface SqlColumnProps {
  type: DataTypesSql;
  length?: number;
  pk?: boolean;
  relatedTo?: SqlModel;
  autoIncrement?: boolean;
  notNull?: boolean;
  defaultValue?: any;
}
