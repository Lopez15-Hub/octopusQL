"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostgreSqlEnviroment = (function () {
    function PostgreSqlEnviroment(keys) {
        this.host = keys.host;
        this.database = keys.database;
        this.password = keys.password;
        this.port = keys.port;
        this.user = keys.user;
    }
    return PostgreSqlEnviroment;
}());
exports.default = PostgreSqlEnviroment;
