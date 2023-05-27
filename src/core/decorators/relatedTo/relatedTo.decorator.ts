import "reflect-metadata";
import { RelatedToProps } from "../../interfaces/decorators/relatedTo.decorator.props";

export function RelatedTo(options: RelatedToProps) {
  return (target: any, propertyKey: string) => {
    const { model, key, driver } = options;
    const modelName = model.constructor.name;
    const sql = `${
      driver == "mssql" ? `CONSTRAINT FK_${key}` : ""
    } FOREIGN KEY (${key}) REFERENCES ${modelName}(${key})`;
    Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
  };
}
