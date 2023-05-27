import { Driver } from "../../types/drivers/drivers.types";
import { SqlModel } from "../database/misc/sqlModel.interface";

export interface RelatedToProps {
  model: SqlModel;
  key: string;
  driver: Driver;
}
