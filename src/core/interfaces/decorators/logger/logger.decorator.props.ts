import { LogType } from "../../../types/log/log.types";

export interface LoggerProps {
  type: LogType;
  message: string;
  useFunctionArgs?: boolean;
  functionParams?: number;
}
