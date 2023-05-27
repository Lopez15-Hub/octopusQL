import { SqlColumn } from "../../../src/core/decorators/column/sqlColumn.decorator";
import { SqlModel } from "../../../src/core/interfaces/database/misc/sqlModel.interface";

export class Customers extends SqlModel {
  @SqlColumn({ type: "INT", pk: true, identity: true })
  customerID: string = "";
  @SqlColumn({ type: "VARCHAR", length: 255 })
  customerName: string = "";
  @SqlColumn({ type: "VARCHAR", length: 255 })
  contactName: string = "";
  @SqlColumn({ type: "VARCHAR", length: 255 })
  address: string = "";
  @SqlColumn({ type: "VARCHAR", length: 255 })
  city: string = "";
  @SqlColumn({ type: "VARCHAR", length: 255 })
  country: string = "";
}
