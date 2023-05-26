import { SqlColumn } from "./core/decorators/dataTypes/sqlColumn.decorator";
import { Schema } from "./core/model/schema.model";
import { OctopusQL } from "./octopus";

export class Person extends Schema {
  @SqlColumn({
    length: 10,
    type: "INT",
    autoIncrement: true,
    notNull: true,
    pk: true,
  })
  id_person: number = 0;

  @SqlColumn({ type: "TEXT", notNull: true })
  apellido: string = "";
  @SqlColumn({ length: 255, type: "VARCHAR", notNull: true })
  dni: string = "";
}

// const mySqlKeys = {
//   database: "bdpos",
//   host: "localhost",
//   password: "Trauko1163Meth",
//   user: "root",
// };
const msSqlKeys = {
  database: "bdpos",
  host: "paivae-methodo.database.windows.net",
  password: "dB8uQGX8pXVy5m8",
  user: "emma",
};

const octopus = new OctopusQL({
  driverType: "mssql",
  credentials: msSqlKeys,
});

async function getReservations() {
  const { query } = await octopus.instance;
  const res = await query
    .select({
      from: { table: "Reservations" },
      values: "*",
    }).execute();
    
    console.log(res);
}

getReservations();
