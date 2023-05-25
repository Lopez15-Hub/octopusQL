export interface LogicQueries {
  execute(): Promise<any[]>;
  groupBy(condition: string): this;
  orderBy(condition: string): this;
  and(condition: string): this;
  or(condition: string): this;
  lessThan(condition: string): this;
  equalsTo(condition: string): this;
  notEqualsTo(condition: string): this;
  higherThan(condition: string): this;
  like(condition: string): this;
}
