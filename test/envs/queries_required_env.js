function validateOptions(options) {
    if (options.useSmartContract && !options.smartContract) {
        throw new Error("smartContract is required when useSmartContract is true");
    }
}
// Ejemplo de uso
var options = {
    useSmartContract: true,
};
validateOptions(options); // Lanzará un error en tiempo de ejecución
console.log(options);
