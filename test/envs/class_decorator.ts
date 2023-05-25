import { TableColumn } from "../../src/core/decorators/dataTypes/tableColum.decorator";

export default class Person {
  @TableColumn({ length: 255, columnName: "nombre", type: "VARCHAR" })
  name: string = "";
}

const getColumn = ()=>{
   const person = new  Person();
   console.log(person.name);
}
getColumn();