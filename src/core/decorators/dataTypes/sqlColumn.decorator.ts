import { SqlColumnProps } from "../../interfaces/decorators/sqlColumn.decorator.props";

export function SqlColumn(options: SqlColumnProps) {
  const { type, autoIncrement, defaultValue, length, notNull, pk } = options;
  return function (target: any, propertyKey: string) {
    // Obtener el valor actual de la propiedad
    let value = target[propertyKey];

    // Definir un descriptor para la propiedad
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function () {
        return value;
      },
      set: function () {
        const sql = `${propertyKey} ${type} ${
          length ? "(" + length + ")" : ""
        } ${pk ? "PRIMARY KEY" : ""} ${autoIncrement ? "AUTO INCREMENT" : ""} ${
          notNull ? "NOT NULL" : ""
        } ${defaultValue ? defaultValue : ""} `;
        value = sql;
      },
    });
  };
}
