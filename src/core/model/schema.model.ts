import { DriverService } from "../types/drivers/driver.service.types";

export class Schema {
  constructor(driver: DriverService) {
    this.construct(driver);
  }

  async construct(_: DriverService) {}
}
