import { OctopusQL } from "./octopus";

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
  const { modeling, query} = await octopus.instance;
  try {
    await modeling.create({ type: "TABLE"});
    query.explainPlan()
  } catch (error) {
    console.log(error);
  }
}

getReservations();
