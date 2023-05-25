"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MsSqlEnviroment = (function () {
    function MsSqlEnviroment(keys) {
        this.host = keys.host;
        this.database = keys.database;
        this.msOptions = keys.msOptions;
        this.msPool = keys.msPool;
        this.password = keys.password;
        this.port = keys.port;
        this.user = keys.user;
    }
    return MsSqlEnviroment;
}());
exports.default = MsSqlEnviroment;
