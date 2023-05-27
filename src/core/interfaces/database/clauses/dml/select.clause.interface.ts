export interface SelectClause {
  model: Function;
  values: string;
  schema?: string;
  useDistinct?: boolean;
}
