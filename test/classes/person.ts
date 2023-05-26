import "reflect-metadata";
import { SqlColumn } from "../../src/core/decorators/column/sqlColumn.decorator";

export class Person {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true })
  id_person: number = 0;

  @SqlColumn({ type: "TEXT" })
  apellido: string = "";
  @SqlColumn({ type: "TEXT" })
  account: string = "";

  @SqlColumn({ length: 255, type: "VARCHAR" })
  dni: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR" })
  dinners: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR" })
  contract: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR" })
  rodeo: string = "";
}