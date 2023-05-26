import { LogService } from "../../services/log/log.service";

export function NotImplemented(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.value = function () {
    target;
    LogService.show({
      message: `${key} is not implemented yet.`,
      type: "WARNING",
    });
  };
  return descriptor;
}
