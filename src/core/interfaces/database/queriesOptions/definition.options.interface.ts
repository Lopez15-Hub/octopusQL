import { Driver } from "../../../types/drivers/drivers.types";

export interface DefinitionOptions {
  readonly tableName: string;
  readonly useSchema?: boolean | undefined;
  readonly useMsDriver?: boolean | undefined;
  readonly schema?: string | "dbo";
  readonly driver: any;
  readonly driverType: Driver;
}
