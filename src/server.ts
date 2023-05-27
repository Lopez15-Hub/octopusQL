import { Customers } from "../test/classes/relations/customer";
import { Orders } from "../test/classes/relations/orders";
import { DatabaseKeys } from "./core/core";
import { LogService } from "./core/services/log/log.service";
import { OctopusQL } from "./octopusQL";

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

const oc = new OctopusQL({
  driverType: "mysql",
  credentials: mySqlKeys,
});

oc.registerSchemas(oc.instance, [new Customers(), new Orders()]);
async function main() {
  try {
    // const res = await query
    //   .select({ values: "*", from: { table: "Orders" } })
    //   .join({
    //     key: "customerID",
    //     modelFrom: new Orders(),
    //     modelTo: new Customers(),
    //   })
    //   .execute();
    // console.log(res[0]);
  } catch (error: any) {
    LogService.show({ message: `${error}`, type: "ERROR" });
  }
}

main();
