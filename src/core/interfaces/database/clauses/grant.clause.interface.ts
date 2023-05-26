export interface GrantClause {
  privileges: string[];
  allowAll?: boolean;
  on: string;
  to: string;
}
