import { Schema } from "../../../model/schema.model";

export interface CreateClause {
  model?: Schema;
  dbOrViewName?: string;
  viewQuery?: string;
  type: "DATABASE" | "TABLE" | "VIEW";
}
