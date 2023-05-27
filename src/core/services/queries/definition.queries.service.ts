import "reflect-metadata";
import { DdlQueries } from "../../interfaces/adapters/queries/ddl.queries.adapter.interface";
import { AlterClause } from "../../interfaces/database/clauses/alter.clause.interface";
import { CreateClause } from "../../interfaces/database/clauses/create.clause.interface";
import { QueriesOptions } from "../../interfaces/database/options/queries.options.interface";
import { Driver } from "../../types/drivers/drivers.types";
import { ErrorService } from "../log/error.service";
import { NotImplemented } from "../../decorators/notImplemented/notImplemented.decorator";
import { DefinitionQueriesHelpers } from "../../helpers/queries/definition.queries.helpers";

export class DefinitionQueriesServices implements DdlQueries {
  private queryString: string;
  private driver: any;
  private driverType: Driver;
  private helpers: DefinitionQueriesHelpers;
  constructor(options: QueriesOptions) {
    const { driver, driverType } = options;
    this.queryString = "";
    this.driverType = driverType;
    this.driver = driver;
    this.helpers = new DefinitionQueriesHelpers(options, this);
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString ?? "", (error: any, rows: any) => {
        if (error) {
          reject(error);
          return;
        }
        if (this.driverType == "mssql") {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async create(options: CreateClause): Promise<void> {
    this.queryString += this.helpers.wantCreate(options);

    try {
      await this.execute();
    } catch (error: any) {
      this.helpers.manageCreateErrors(error, options);
    }
  }
  async alter(options: AlterClause): Promise<any> {
    const { columns, model, schema } = options;
    this.queryString = `ALTER TABLE ${schema ? schema + "." : ""}${
      model.constructor.name
    } ${columns} `;
    try {
      await this.execute();
    } catch (error: any) {
      this.helpers.manageAlterErrors(error, model);
    }
  }
  @NotImplemented
  drop(): this {
    throw ErrorService.factory("oc_method_not_implemented");
  }
  @NotImplemented
  rename(): this {
    throw ErrorService.factory("oc_method_not_implemented");
  }
  @NotImplemented
  truncate(): this {
    throw ErrorService.factory("oc_method_not_implemented");
  }
  @NotImplemented
  comment(): this {
    throw ErrorService.factory("oc_method_not_implemented");
  }
}
