interface MyOptions {
  useSmartContract?: boolean;
  smartContract?: string;
}

function validateOptions(
  options: MyOptions
): asserts options is MyOptions & { smartContract: string } {
  if (options.useSmartContract && !options.smartContract) {
    throw new Error("smartContract is required when useSmartContract is true");
  }
}

// Ejemplo de uso
const options: MyOptions = {
  useSmartContract: true,
};

validateOptions(options); // Lanzará un error en tiempo de ejecución

console.log(options);
