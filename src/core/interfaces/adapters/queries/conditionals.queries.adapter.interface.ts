import { JoinClause } from "../../database/clauses/join.clause.interface";
import { LogicQueries } from "./logic.queries.adapter.interface";

export interface ConditionalsQueries {
  execute(): Promise<any[]>;
  where(condition: string): LogicQueries;
  join(options: JoinClause): this;
  groupBy(condition: string): this;
  orderBy(condition: string): this;
  like(condition: string): this;
}
