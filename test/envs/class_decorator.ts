import { TableColumn } from "../../src/core/decorators/dataTypes/tableColum.decorator";
import { Model } from "../../src/core/interfaces/model/model.interface";

export default class Person {
  @TableColumn({ length: 255, type: "VARCHAR" })
  nombre: string = "";
  @TableColumn({ length: 255, type: "VARCHAR" })
  apellido: string = "";
  @TableColumn({ length: 255, type: "VARCHAR" })
  dni: string = "";
}

const getColumn = () => {
  const person = new Person();
  const modelToSql = Model.tableFromModel(person);
  console.log(modelToSql);
};
getColumn();
