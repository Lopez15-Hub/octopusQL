import { Shipments } from "../test/classes/relations/shipments";
import { Orders } from "../test/classes/relations/orders";
import { DatabaseKeys } from "./core/core";
import { LogService } from "./core/services/log/log.service";
import { OctopusQL } from "./octopusQL";
import { Customers } from "../test/classes/relations/customer";

const mySqlKeys: DatabaseKeys = {
  database: "db_test",
  host: "localhost",
  password: "Trauko1163Meth",
  user: "root",
};
// const msSqlKeys: DatabaseKeys = {
//   database: "test_db",
//   host: "paivae-methodo.database.windows.net",
//   password: "dB8uQGX8pXVy5m8",
//   user: "emma",
//   msOptions: {
//     encrypt: true,
//     trustServerCertificate: false,
//   },
//   msPool: {
//     idleTimeoutMillis: 3000,
//     max: 100000,
//     min: 1000,
//   },

const { instance, registerSchemas } = new OctopusQL({
  driverType: "mysql",
  credentials: mySqlKeys,
});

registerSchemas(instance, [new Customers(), new Orders(), new Shipments()]);
async function main() {
  const { query } = await instance;
  try {
    const res = await query
      .select({ values: "customerName", model: Customers })
      .join({
        key: "customerID",
        modelFrom: new Customers(),
        modelTo: new Shipments(),
      })
      .execute();
    console.log(res);
  } catch (error: any) {
    LogService.show({ message: `${error}`, type: "ERROR" });
  }
}
main();
