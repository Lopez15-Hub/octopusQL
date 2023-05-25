import { DriverService } from "../types/drivers/driver.service.types";

export class Schema {
  constructor(driver: DriverService) {
    this.construct(driver);
  }

  async construct(driver: DriverService) {
    const { modeling } = await driver.instance(this.constructor.name);
    const { create } = modeling();
    await create({ model: this, type: "TABLE" });
  }
}
