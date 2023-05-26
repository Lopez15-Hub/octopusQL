import { SelectClause } from "../../database/clauses/clauses.interface";
import { DeleteClause } from "../../database/clauses/dml/delete.clause.interface";
import { InsertClause } from "../../database/clauses/dml/insert.clause.interface";
import { UpdateClause } from "../../database/clauses/dml/update.clause.interface";
import { ConditionalsQueries } from "./conditionals.queries.adapter.interface";

export interface DmlQueries {
  select(options: SelectClause): ConditionalsQueries;
  insert(options: InsertClause): ConditionalsQueries;
  update(options: UpdateClause): ConditionalsQueries;
  delete(options:DeleteClause): ConditionalsQueries;
  merge(): ConditionalsQueries;
  explainPlan(): ConditionalsQueries;
  lockTable(): ConditionalsQueries;
}
