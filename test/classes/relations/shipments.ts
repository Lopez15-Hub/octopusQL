import { SqlColumn } from "../../../src/core/decorators/column/sqlColumn.decorator";
import { RelatedTo } from "../../../src/core/decorators/relatedTo/relatedTo.decorator";
import { SqlModel } from "../../../src/core/interfaces/database/misc/sqlModel.interface";
import { Customers } from "./customer";

export class Shipments extends SqlModel {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true, length: 10 })
  shipmentID: number = 0;

  // Relación con la tabla Customers
  @RelatedTo({ type: "INT", model: new Customers()})
  customerId: number = 0;

  @SqlColumn({ type: "VARCHAR", length: 255 })
  shipmentDate: string = "";

  // Resto de columnas de la tabla Shipments

  // ...
}
