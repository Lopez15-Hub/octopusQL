import { Order } from "../../../types/database/order.type";

export interface LogicQueries {
  execute(): Promise<any[]>;
  and(condition: string): this;
  or(condition: string): this;
  lessThan(condition: string): this;
  equalsTo(condition: string): this;
  notEqualsTo(condition: string): this;
  higherThan(condition: string): this;
  orderBy(condition: string, order: Order): this;
  groupBy(condition: string, order: Order): this;
  like(pattern: string): this;
}
