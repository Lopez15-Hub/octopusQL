import {
  QueriesAdapter,
  SelectClause,
  SqlColumn,
} from '../../interfaces/interfaces';

export default class QueriesService implements QueriesAdapter {
  queryString: any;

  databaseName: string;

  constructor(
    readonly tableName: string,
    databaseName: string,
    readonly driver: any,
    readonly useMsDriver?: boolean | undefined
  ) {
    this.tableName = tableName;
    this.queryString = '';
    this.databaseName = databaseName;
    this.useMsDriver = useMsDriver;
  }

  createTable(values: SqlColumn[]) {
    const columnDefinitions = values
      .map((column) => `${column.col} ${column.value}`)
      .join(', ');

    this.queryString = `CREATE TABLE  IF NOT EXISTS ${
      this.useMsDriver ? "dbo" : this.databaseName
    }.${this.tableName} (${columnDefinitions})`;
    return this;
  }

  createDatabase() {
    this.queryString = `CREATE DATABASE IF NOT EXISTS ${this.databaseName}`;
    return this;
  }

  select({ values, useDistinct = false }: SelectClause) {
    this.queryString = `SELECT ${
      useDistinct ? 'DISTINCT' : ''
    } ${values} FROM  ${this.useMsDriver ? 'dbo' : this.databaseName}.${
      this.tableName
    }`;
    return this;
  }

  delete(): this {
    this.queryString = `DELETE FROM ${
      this.useMsDriver ? 'dbo' : this.databaseName
    }.${this.tableName}`;
    return this;
  }

  update(columns: Object) {
    const setClause = Object.entries(columns)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(', ');

    this.queryString = `UPDATE ${
      this.useMsDriver ? 'dbo' : this.databaseName
    }.${this.tableName} SET ${setClause} `;
    return this;
  }

  async execute(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.driver.query(this.queryString, (error: any, rows: any) => {
        if (error) {
          reject(error);
          return;
        }
        if (this.useMsDriver) {
          resolve(rows.recordset);
        } else {
          resolve(rows);
        }
      });
    });
  }

  insert(data: Object) {
    const columns = `(${Object.keys(data).join(',')})`;
    const values = `(${Object.values(data)
      .map((val) => `'${val}'`)
      .join(',')})`;

    this.queryString = `INSERT INTO ${
      this.useMsDriver ? 'dbo' : this.databaseName
    }.${this.tableName} ${columns} VALUES ${values}  `;
    return this;
  }

  where(condition: string) {
    this.queryString = `${this.queryString} WHERE ${condition}`;
    return this;
  }

  and(condition: string) {
    this.queryString = `${this.queryString} AND ${condition}`;
    return this;
  }

  or(condition: string) {
    this.queryString = `${this.queryString} OR ${condition}`;
    return this;
  }

  groupBy(condition: string) {
    this.queryString = `${this.queryString} GROUP BY ${condition}`;
    return this;
  }

  orderBy(condition: string) {
    this.queryString = `${this.queryString} ORDER BY ${condition}`;
    return this;
  }
}
