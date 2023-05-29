import { DatabaseKeys } from "./core/core";
import { LogService } from "./core/services/log/log.service";
import { OctopusQL } from "./octopusQL";

const mySqlKeys: DatabaseKeys = {
  database: "bdpos",
  host: "localhost",
  password: "Trauko1163Meth",
  user: "root",
};
let changeToMy: boolean = false;
const msSqlKeys: DatabaseKeys = {
  database: "bdpos",
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

const { instance } = new OctopusQL({
  driverType: changeToMy ? "mysql" : "mssql",
  credentials: changeToMy ? mySqlKeys : msSqlKeys,
});

// registerSchemas(instance, [new Customers(), new Orders(), new Shipments()]);

async function main() {
  const { query } = await instance;
  try {
    const res = query.select({
      values: "*",
      model: Reservations,
    });
    console.log(await res.execute());
  } catch (error: any) {
    LogService.show({ message: `${error}`, type: "ERROR" });
  }
}
main();
class Reservations {}
