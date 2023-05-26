import "reflect-metadata";
import { SqlColumn } from "./core/decorators/column/sqlColumn.decorator";
import { Schema } from "./core/model/schema.model";
import { OctopusQL } from "./octopus";

export class Person extends Schema {
  @SqlColumn({ type: "INT", pk: true, autoIncrement: true })
  id_person: number = 0;

  @SqlColumn({ type: "TEXT" })
  apellido: string = "";
  @SqlColumn({ type: "TEXT" })
  account: string = "";

  @SqlColumn({ length: 255, type: "VARCHAR" })
  dni: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR" })
  rodeo: string = "";
}

const mySqlKeys = {
  database: "db_test",
  host: "localhost",
  password: "Trauko1163Meth",
  user: "root",
};
// const msSqlKeys = {
//   database: "bdpos",
//   host: "paivae-methodo.database.windows.net",
//   password: "dB8uQGX8pXVy5m8",
//   user: "emma",
// };

const octopus = new OctopusQL({
  driverType: "mysql",
  credentials: mySqlKeys,
});

async function getReservations() {
  const { modeling } = await octopus.instance;
  try {
    await modeling.create({ type: "TABLE", model: new Person() });
  } catch (error) {
    console.log(error);
  }
}

getReservations();
