import { SqlColumn } from "../../../src/core/decorators/column/sqlColumn.decorator";
import { RelatedTo } from "../../../src/core/decorators/relatedTo/relatedTo.decorator";
import { SqlModel } from "../../../src/core/interfaces/database/misc/sqlModel.interface";
import { Customers } from "./customer";

export class Orders extends SqlModel {
  
  @SqlColumn({ type: "INT", pk: true, identity: true })
  orderId: number = 0;
  
  @SqlColumn({ type: "INT" })
  customerId: number = 0;
  
  @RelatedTo({ key: "customerId", model: new Customers(), driver: "mssql" })
  fk_customerId: number = 0;
  
  @SqlColumn({ type: "VARCHAR", length: 255 })
  orderNumber: string = "";
  
  @SqlColumn({ type: "VARCHAR", length: 255 })
  orderDate: string = "";

  @SqlColumn({ type: "VARCHAR", length: 255 })
  city: string = "";
}
