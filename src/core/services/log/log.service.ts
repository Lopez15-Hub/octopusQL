import { LogOptions } from "../../interfaces/app/logOptions.interface";

export class LogService {
  static show(options: LogOptions) {
    const { message, type } = options;
    switch (type) {
      case "ERROR":
        return console.error(
          "\x1b[41m\x1b[37m%s\x1b[0m",
          `\n [OCTO_ERR] ${message} \n`
        );
      case "INFO":
        return console.info(
          "\x1b[44m\x1b[37m%s\x1b[0m",
          `\n [OCTO_INFO] ${message} \n`
        );
      case "WARNING":
        return console.warn(
          "\x1b[43m%s\x1b[0m",
          `\n [OCTO_WARN] ${message} \n`
        );
      case "SUCCESS":
        return console.info(
          "\x1b[42m\x1b[37m%s\x1b[0m",
          `\n [OCTO_OK] ${message} \n`
        );
    }
  }
}
