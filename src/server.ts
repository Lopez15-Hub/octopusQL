import { SqlColumn } from "./core/decorators/dataTypes/sqlColumn.decorator";
import { Schema } from "./core/model/schema.model";
import { OctopusQL } from "./octopus";

class Person extends Schema {
  @SqlColumn({
    length: 10,
    type: "INT",
    autoIncrement: true,
    notNull: true,
    pk: true,
  })
  id_person: number = 0;

  @SqlColumn({ type: "TEXT", notNull: true })
  apellido: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR", notNull: true })
  dni: string = "";
}

const octopus = new OctopusQL({
  driver: "mysql",
});

octopus.driver?.connect();

new Person(octopus.driver!);
