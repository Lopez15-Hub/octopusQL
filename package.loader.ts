import * as fs from "fs";
import { findUp } from "find-up";
import { Package } from "./src/core/interfaces/app/package.interface";

export function readJSONFile(): Promise<Package> {
  const filePath = "package.json";

  return new Promise((resolve, reject) => {
    findUp(filePath).then((packageJsonPath) => {
      if (packageJsonPath) {
        fs.readFile(packageJsonPath, "utf8", (err, data) => {
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
      } else {
        reject(
          new Error(
            "El archivo package.json no se encontró en el árbol de directorios."
          )
        );
      }
    });
  });
}
