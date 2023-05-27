import { LogService } from "./log.service";

export class ErrorService extends Error {
  constructor(type: string) {
    super(type);
  }

  static factory(reason: string, debugMessage?: string) {
    LogService.show({
      message: debugMessage ?? reason,
      type: "ERROR",
    });
    return new ErrorService(reason);
  }
}
