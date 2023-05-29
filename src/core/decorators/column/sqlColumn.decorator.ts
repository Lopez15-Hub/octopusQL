import { SqlColumnProps } from "../../interfaces/decorators/sqlColumn.decorator.props";
import { ErrorService } from "../../services/log/error.service";

export function SqlColumn(options: SqlColumnProps) {
  const { type, autoIncrement, defaultValue, length, notNull, pk, identity } =
    options;
  if (autoIncrement && identity) {
    throw ErrorService.factory(
      "incorrect_attribute_use",
      "Can't use both auto incremental atributes. Please use AUTO_INCREMENT for mySql and IDENTITY for Sql server. "
    );
  }
  return (target: any, propertyKey: string) => {
    const sql = buildColumnTypeDefinition(
      propertyKey,
      type,
      autoIncrement,
      length,
      identity,
      pk,
      notNull,
      defaultValue
    );
    setMetadata(target, propertyKey, sql);
  };
}

function buildColumnTypeDefinition(
  propertyKey: string,
  type: string,
  autoIncrement?: boolean,
  length?: number,
  identity?: boolean,
  pk?: boolean,
  notNull?: boolean,
  defaultValue?: string
): string {
  let sql = `${propertyKey} ${type}`;
 if (length) {
   sql += `(${length})`;
 }
  if (autoIncrement) {
    sql += " AUTO_INCREMENT";
  }

 

  if (identity) {
    sql += " IDENTITY(1,1)";
  }

  if (pk) {
    sql += " PRIMARY KEY";
  }

  if (notNull) {
    sql += " NOT NULL";
  }

  if (defaultValue) {
    sql += ` ${defaultValue}`;
  }

  return sql;
}

function setMetadata(target: any, propertyKey: string, sql: string): void {
  Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
}
