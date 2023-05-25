import { DataTypesSql } from "../../types/dataTypes/dataTypesSql.types";

export interface SqlColumnProps {
  type: DataTypesSql;
  length?: number;
  pk?: boolean;
  autoIncrement?: boolean;
  notNull?: boolean;
  defaultValue?: any;
}
