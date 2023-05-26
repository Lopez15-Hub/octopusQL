
export interface DclQueries {
  grant(): this;
  revoke(): Promise<any>;
  execute(): Promise<any>;
}
