import { OctopusQL } from "../../src/octopus";

const octopus = new OctopusQL({
  credentials: {
    database: "",
    host: "",
    password: "",
    user: "",
  },
  driver: "mysql",
});

async function useQ() {
  const { search } = await octopus.getInstanceOf("persons");
  search().select({ values: "*" }).where("").execute();
}
