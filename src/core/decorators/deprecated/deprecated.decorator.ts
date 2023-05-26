import { LogService } from "../../services/log/log.service";

export function Deprecated(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.value = function () {
    target;
    LogService.show({
      message: `The method '${key}' is deprecated and may be removed in the future.`,
      type: "WARNING",
    });
  };
  return descriptor;
}
