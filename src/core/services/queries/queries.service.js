"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_queries_service_1 = require("./search.queries.service");
var QueriesService = (function () {
    function QueriesService(options) {
        var tableName = options.tableName, driver = options.driver, driverType = options.driverType;
        this.tableName = tableName;
        this.driver = driver;
        this.driverType = driverType;
    }
    QueriesService.prototype.query = function (schema) {
        return new search_queries_service_1.SearchQueriesService({
            tableName: this.tableName,
            schema: schema,
            useSchema: schema ? true : false,
            driver: this.driver,
            driverType: this.driverType,
        });
    };
    QueriesService.prototype.auth = function () {
        throw new Error("Method not implemented.");
    };
    QueriesService.prototype.modeling = function () {
        throw new Error("Method not implemented.");
    };
    return QueriesService;
}());
exports.default = QueriesService;
