"use strict";
function validateOptions(options) {
    if (options.useSmartContract && !options.smartContract) {
        throw new Error("smartContract is required when useSmartContract is true");
    }
}
var options = {
    useSmartContract: true,
};
validateOptions(options);
console.log(options);
