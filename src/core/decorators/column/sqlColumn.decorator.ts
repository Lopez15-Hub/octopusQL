import "reflect-metadata";
import { SqlColumnProps } from "../../interfaces/decorators/sqlColumn.decorator.props";
import { LogService } from "../../services/log/log.service";

export function SqlColumn(options: SqlColumnProps) {
  const { type, autoIncrement, defaultValue, length, notNull, pk, identity } =
    options;
  if (autoIncrement && identity) {
    LogService.show({
      message:
        "Can't use both auto incremental atributes. Please use AUTO_INCREMENT for mySql and IDENTITY for Sql server. ",
      type: "ERROR",
    });
    throw new Error("INCORRENT_ATRIBUTE_USE");
  }
  return (target: any, propertyKey: string) => {
    const sql = `${propertyKey} ${type} ${length ? "(" + length + ")" : ""} ${
      identity ? "IDENTITY(1,1) " : ""
    }${pk ? "PRIMARY KEY" : ""} ${autoIncrement ? "AUTO_INCREMENT" : ""}  ${
      notNull ? "NOT NULL" : ""
    } ${defaultValue ? defaultValue : ""} `;
    Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
  };
}
