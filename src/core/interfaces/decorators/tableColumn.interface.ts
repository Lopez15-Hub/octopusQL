import { DataTypesSql } from "../../types/dataTypes/dataTypesSql.types";

export interface TableColumn {
  type: DataTypesSql;
  length: number;
}
