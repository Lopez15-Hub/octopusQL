import { LoggerProps } from "../../interfaces/decorators/logger/logger.decorator.props";
import { LogService } from "../../services/log/log.service";

export function PrintBefore(options: LoggerProps) {
  const { message, type, functionParams } = options;
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const fnArgs = functionParams! >= 0 ? args[functionParams!] : [];
      const result = await originalMethod.apply(this, args);
      LogService.show({
        message: `${message} [ ${fnArgs ? fnArgs : ""} ]`,
        type,
      });

      return result;
    };
    return descriptor;
  };
}
