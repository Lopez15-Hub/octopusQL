import "reflect-metadata";
import { SqlColumn } from "../../src/core/decorators/column/sqlColumn.decorator";
import { SqlModel } from "../../src/core/interfaces/database/misc/sqlModel.interface";
import { SqlKey } from "../../src/core/types/dataTypes/primaryKey.types";

export class Person extends SqlModel {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true })
  id_person: SqlKey = 0;


  @SqlColumn({ type: "TEXT" })
  apellido: string = "";
  @SqlColumn({ type: "TEXT" })
  apellido2: string = "";
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
