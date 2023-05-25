import { TableColumn } from "../../interfaces/decorators/tableColumn.interface";

export function TableColumn({ type, length }: TableColumn) {
  return function (target: any, propertyKey: string) {
    let prop = target[propertyKey];

    const getter = () => prop;
    const setProperties = () => {
      prop = `${propertyKey} ${type} ${length ? `(${length})` : ""}`;
    };
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: getter,
      set: setProperties,
    });
  };
}
