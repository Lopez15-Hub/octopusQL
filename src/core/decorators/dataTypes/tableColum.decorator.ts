import { TableColumn } from "../../interfaces/decorators/tableColumn.interface";

export function TableColumn({ columnName: name, type, length }: TableColumn) {
  return function (target: any, propertyKey: string) {
    // Obtener el descriptor de la propiedad
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

    // Modificar el descriptor para agregar el tipo "VARCHAR" y la longitud
    Object.defineProperty(target, propertyKey, {
      ...descriptor,
      writable: true,
      configurable: true,
      enumerable: true,
      value: `${name} ${type}(${length})`,
    });
  };
}
