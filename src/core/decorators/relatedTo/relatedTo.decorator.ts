import "reflect-metadata";
import { RelatedToProps } from "../../interfaces/decorators/relatedTo.decorator.props";

export function RelatedTo(options: RelatedToProps) {
  return (target: any, propertyKey: string) => {
    const { model, key } = options;
    const modelName = model.constructor.name; // Nombre del constructor de la clase Materias
    const sql = `FOREIGN KEY (${key}) REFERENCES ${modelName}(${key})`;
    console.log(sql);
    Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
  };
}
