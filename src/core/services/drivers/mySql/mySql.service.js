"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("mysql");
var queries_service_1 = require("../../queries/queries.service");
var MySqlService = (function () {
    function MySqlService(keys) {
        var _this = this;
        this.keys = keys;
        this.instance = function (table) {
            return new queries_service_1.default(table, _this.keys.database, _this.driver);
        };
        this.close = function () { return _this.driver.end(); };
        this.driver = mysql_1.default.createConnection({
            database: keys.database,
            host: keys.host,
            port: keys.port,
            password: keys.password,
            user: keys.user,
        });
        this.tableName = '';
        this.queryString = '';
    }
    MySqlService.prototype.connect = function () {
        try {
            this.driver.connect();
        }
        catch (error) {
            throw new Error("Error al conectar: ".concat(error));
        }
    };
    return MySqlService;
}());
exports.default = MySqlService;
