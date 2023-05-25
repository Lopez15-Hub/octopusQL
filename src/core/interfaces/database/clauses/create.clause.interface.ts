import { Schema } from "../../../model/schema.model";

export interface CreateClause {
  model: Schema;
  type: "DATABASE" | "TABLE" | "VIEW";
}
