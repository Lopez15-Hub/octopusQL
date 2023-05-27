import * as fs from "fs";
import { Package } from "./src/core/interfaces/app/package.interface";
const filePath = "./package.json";

export function readJSONFile(): Promise<Package> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });
  });
}
