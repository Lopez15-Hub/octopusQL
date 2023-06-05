import { OctopusQL } from "../src/octopusQL";
async function main() {
  new OctopusQL({
    driverType: "mssql",
    credentials: {
      database: "bdpos",
      host: "methododb.paivae.cloud",
      password: "4dd@<MEE@CXc-'/F",
      user: "sqlserver",
      msOptions: {
        trustServerCertificate: true,
        encrypt: true,
      },
    },
  });
}
main();
