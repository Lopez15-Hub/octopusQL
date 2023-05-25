"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueriesService = void 0;
var conditionals_service_1 = require("./conditionals.service");
var SearchQueriesService = (function () {
    function SearchQueriesService(options) {
        var tableName = options.tableName, useSchema = options.useSchema, schema = options.schema, driver = options.driver, driverType = options.driverType;
        this.tableName = tableName;
        this.queryString = "";
        this.useSchema = useSchema;
        this.driver = driver;
        this.driverType = driverType;
        if (!useSchema && schema) {
            throw new Error("Error: Cannot provide a schema when useSchema is false.");
        }
        if (useSchema) {
            this.schema = schema;
        }
    }
    SearchQueriesService.prototype.select = function (_a) {
        var values = _a.values, _b = _a.useDistinct, useDistinct = _b === void 0 ? false : _b;
        this.queryString = "SELECT ".concat(useDistinct ? "DISTINCT" : "", " ").concat(values, " FROM  ").concat(this.useSchema ? this.schema : this.tableName, ".").concat(this.tableName);
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.delete = function () {
        this.queryString = "DELETE FROM ".concat(this.useSchema ? "dbo" : this.tableName, ".").concat(this.tableName);
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.update = function (columns) {
        var setClause = Object.entries(columns)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, " = '").concat(value, "'");
        })
            .join(", ");
        this.queryString = "UPDATE ".concat(this.useSchema ? "dbo" : this.tableName, ".").concat(this.tableName, " SET ").concat(setClause, " ");
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.insert = function (data) {
        var columns = "(".concat(Object.keys(data).join(","), ")");
        var values = "(".concat(Object.values(data)
            .map(function (val) { return "'".concat(val, "'"); })
            .join(","), ")");
        this.queryString = "INSERT INTO ".concat(this.useSchema ? "dbo" : this.tableName, ".").concat(this.tableName, " ").concat(columns, " VALUES ").concat(values, "  ");
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.merge = function () {
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.explainPlan = function () {
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    SearchQueriesService.prototype.lockTable = function () {
        return new conditionals_service_1.default({
            queryString: this.queryString,
            driver: this.driver,
            useMsDriver: this.driverType == "mssql" ? true : false,
        });
    };
    return SearchQueriesService;
}());
exports.SearchQueriesService = SearchQueriesService;
