export interface LogicQueries {
  execute(): Promise<any[]>;

  and(condition: string): this;
  or(condition: string): this;
  lessThan(condition: string): this;
  equalsTo(condition: string): this;
  notEqualsTo(condition: string): this;
  higherThan(condition: string): this;
}
