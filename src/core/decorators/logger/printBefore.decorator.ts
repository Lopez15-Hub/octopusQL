import { LoggerProps } from "../../interfaces/decorators/logger/logger.decorator.props";

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
      if (type == "sucess") {
        console.log(
          "\x1b[42m\x1b[37m%s\x1b[0m",
          `\n [OCTOPUSQL] ${message}${fnArgs ? fnArgs : ""} \n`
        );
      }
      if (type == "error") {
        console.log(
          "\x1b[41m\x1b[37m%s\x1b[0m",
          `\n [OCTOPUSQL] ${message}${fnArgs ? fnArgs : ""} \n`
        );
      }
      if (type == "warning") {
        console.log(
          "\x1b[43m%s\x1b[0m",
          `\n [OCTOPUSQL] ${message}${fnArgs ? fnArgs : ""} \n`
        );
      }
      if (type == "info") {
        console.log(
          "\x1b[44m\x1b[37m%s\x1b[0m",
          `\n [OCTOPUSQL] ${message} ${fnArgs ? fnArgs : ""}  \n`
        );
      }
      return result;
    };
    return descriptor;
  };
}


