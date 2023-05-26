import "reflect-metadata";
import { SqlColumnProps } from "../../interfaces/decorators/sqlColumn.decorator.props";

export function SqlColumn(options: SqlColumnProps) {
  const { type, autoIncrement, defaultValue, length, notNull, pk } = options;
  return (target: any, propertyKey: string) => {
    const sql = `${propertyKey} ${type} ${length ? "(" + length + ")" : ""} ${
      pk ? "PRIMARY KEY" : ""
    } ${autoIncrement ? "AUTO_INCREMENT" : ""} ${notNull ? "NOT NULL" : ""} ${
      defaultValue ? defaultValue : ""
    } `;
    Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
  };
}
