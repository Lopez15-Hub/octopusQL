import { FromOptions } from "../../options/from.options.interface";

export interface SelectClause {
  from: FromOptions;
  values: string;
  useDistinct?: boolean;
}
