import { DatabaseUser } from "../misc/databaseUser.interface";

export interface CreateClause {
  model?: Object;
  newUser?: DatabaseUser;
  schema?: string;
  dbOrViewName?: string;
  viewQuery?: string;
  type: "DATABASE" | "TABLE" | "VIEW" | "USER";
}
