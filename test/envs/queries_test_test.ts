import { OctopusQL } from "../../src/octopus";

const { getInstanceOf } = new OctopusQL({
  credentials: {
    database: "",
    host: "",
    password: "",
    user: "",
  },
  driver: "mysql",
});

async () => {
  const { query } = await getInstanceOf("persons");
  const { select } = query();
  select({ values: "*" }).where("").execute();
};
