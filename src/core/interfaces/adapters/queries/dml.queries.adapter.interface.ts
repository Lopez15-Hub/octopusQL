import ConditionalsQueriesService from "../../../services/queries/conditionals.queries.service";
import { SelectClause } from "../../database/clauses/clauses.interface";
import { DeleteClause } from "../../database/clauses/dml/delete.clause.interface";
import { InsertClause } from "../../database/clauses/dml/insert.clause.interface";
import { UpdateClause } from "../../database/clauses/dml/update.clause.interface";

export interface DmlQueries {
  select(options: SelectClause): ConditionalsQueriesService;
  insert(options: InsertClause): ConditionalsQueriesService;
  update(options: UpdateClause): ConditionalsQueriesService;
  delete(options: DeleteClause): ConditionalsQueriesService;
  merge(): ConditionalsQueriesService;
  explainPlan(): ConditionalsQueriesService;
  lockTable(): ConditionalsQueriesService;
}
