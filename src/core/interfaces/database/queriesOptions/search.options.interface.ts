export interface SearchOptions {
  readonly tableName: string;
  readonly useSchema?: boolean | undefined;
  readonly schema?: string | "dbo";
}
