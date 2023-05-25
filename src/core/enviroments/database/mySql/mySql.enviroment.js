"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MySqlEnviroment = (function () {
    function MySqlEnviroment(keys) {
        this.host = keys.host;
        this.database = keys.database;
        this.password = keys.password;
        this.port = keys.port;
        this.user = keys.user;
    }
    return MySqlEnviroment;
}());
exports.default = MySqlEnviroment;
