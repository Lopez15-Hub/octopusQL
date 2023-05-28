import { SqlColumn } from "../../../src/core/decorators/column/sqlColumn.decorator";
import { RelatedTo } from "../../../src/core/decorators/relatedTo/relatedTo.decorator";
import { SqlModel } from "../../../src/core/interfaces/database/misc/sqlModel.interface";
import { Orders } from "./orders";

export class Shipments extends SqlModel {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true, length: 10 })
  shipmentID: number = 0;

  @RelatedTo({ type: "INT", model: Orders })
  orderId: number = 0;

  @SqlColumn({ type: "VARCHAR", length: 255 })
  shipmentDate: string = "";

  @SqlColumn({ type: "VARCHAR", length: 255 })
  shipmentTag: string = "";
}

