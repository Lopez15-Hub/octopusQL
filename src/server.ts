// import { Customers } from "../test/classes/relations/customer";
// import { Orders } from "../test/classes/relations/orders";
import { Customers } from "../test/classes/relations/customer";
import { Orders } from "../test/classes/relations/orders";
import { DatabaseKeys } from "./core/core";
import { LogService } from "./core/services/log/log.service";
import { OctopusQL } from "./octopusQL";

// const mySqlKeys = {
//   database: "db_test",
//   host: "localhost",
//   password: "Trauko1163Meth",
//   user: "root",
// };
const msSqlKeys: DatabaseKeys = {
  database: "test_db",
  host: "paivae-methodo.database.windows.net",
  password: "dB8uQGX8pXVy5m8",
  user: "emma",
  msOptions: {
    encrypt: true,
    trustServerCertificate: false,
  },
  msPool: {
    idleTimeoutMillis: 3000,
    max: 100000,
    min: 1000,
  },
};

const octopus = new OctopusQL({
  driverType: "mssql",
  credentials: msSqlKeys,
});

async function main() {
  const { query } = await octopus.instance;
  try {
    // await modeling.create({
    //   type: "TABLE",
    //   model: new Orders(),
    //   schema: "dbo",
    // });
    // await modeling.create({
    //   type: "TABLE",
    //   model: new Customers(),
    //   schema: "dbo",
    // });
   const res = await query
     .select({ values: "*", from: { table: "Orders" } })
     .join({
       key: "customerID",
       modelFrom: new Orders(),
       modelTo: new Customers(),
     })
     .execute();
    console.log(res);
  } catch (error: any) {
    LogService.show({ message: `${error}`, type: "ERROR" });
  }
}

main();
