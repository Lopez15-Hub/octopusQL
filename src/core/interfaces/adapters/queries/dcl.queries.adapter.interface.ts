import { GrantClause } from "../../database/clauses/grant.clause.interface";

export interface DclQueries {
  grant(options: GrantClause): Promise<any>;
  revoke(): Promise<any>;
  execute(): Promise<any>;
}
