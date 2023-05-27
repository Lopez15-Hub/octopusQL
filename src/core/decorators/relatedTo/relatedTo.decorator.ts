import "reflect-metadata";
import { RelatedToProps } from "../../interfaces/decorators/relatedTo.decorator.props";

export function RelatedTo(options: RelatedToProps) {
  return (target: any, propertyKey: string) => {
    const { model, type } = options;
    const modelName = model.name;
    const sql = `${propertyKey} ${type}`;

    const fk_sql = `CONSTRAINT FK_${abbreviateName(
      modelName
    )}_${propertyKey} FOREIGN KEY (${propertyKey}) REFERENCES ${modelName}(${propertyKey})`;
    Reflect.defineMetadata(`fk_${propertyKey}`, fk_sql, target, propertyKey);
    Reflect.defineMetadata(propertyKey, sql, target, propertyKey);
  };
}
function abbreviateName(name: string) {
  const words = name.split(" ");
  if (words.length === 1) {
    return name;
  }
  const abbreviation = words
    .map((word: string) => word.charAt(0).toUpperCase())
    .join("");
  return abbreviation;
}
