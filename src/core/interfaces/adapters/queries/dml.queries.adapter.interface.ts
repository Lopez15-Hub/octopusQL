import { SelectClause } from "../../database/clauses/clauses.interface";
import { ConditionalsQueries } from "./conditionals.queries.adapter.interface";

export interface DmlQueries {
  select({ values, useDistinct }: SelectClause): ConditionalsQueries;
  insert(data: Object): ConditionalsQueries;
  update(columns: Object): ConditionalsQueries;
  delete(): ConditionalsQueries;
  merge(): ConditionalsQueries;
  explainPlan(): ConditionalsQueries;
  lockTable(): ConditionalsQueries;
}
