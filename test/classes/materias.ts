import "reflect-metadata";
import { SqlColumn } from "../../src/core/decorators/column/sqlColumn.decorator";
import { SqlModel } from "../../src/core/interfaces/database/misc/sqlModel.interface";

export class Materias extends SqlModel {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true })
   id_materia: number = 0;

  @SqlColumn({ type: "VARCHAR", length: 100 })
  materiaName: string = "";
  @SqlColumn({ type: "VARCHAR", length: 100 })
  date: string = "";
}
