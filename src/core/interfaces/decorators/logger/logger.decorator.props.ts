export interface LoggerProps {
  type: "sucess" | "warning" | "info" | "error";
  message: string;
  useFunctionArgs?: boolean;
  functionParams?: number;
}
