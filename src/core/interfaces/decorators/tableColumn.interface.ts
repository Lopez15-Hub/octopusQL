import { DataTypesSql } from "../../types/dataTypes/dataTypesSql.types";

export interface TableColumn {
  columnName: string;
  type: DataTypesSql;
  length: number;
}
