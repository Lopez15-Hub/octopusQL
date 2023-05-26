
export interface CreateClause {
  model?: Object;
  schema?:string;
  dbOrViewName?: string;
  viewQuery?: string;
  type: "DATABASE" | "TABLE" | "VIEW";
}
