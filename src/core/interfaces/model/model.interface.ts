export class Model {
  static tableFromModel(model: Object) {
    const columnNames = Object.keys(model);
    const columnValues = Object.values(model);
    let sql = "(";
    sql += columnNames.join(", ");
    sql += ") VALUES (";
    sql += columnValues.map((value) => `'${value}'`).join(", ");
    sql += ");";
    return sql;
  }
}
