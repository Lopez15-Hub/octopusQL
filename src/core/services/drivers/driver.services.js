"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlService = exports.SqlServerService = void 0;
var msSql_service_1 = require("./msSql/msSql.service");
Object.defineProperty(exports, "SqlServerService", { enumerable: true, get: function () { return msSql_service_1.default; } });
var mySql_service_1 = require("./mySql/mySql.service");
Object.defineProperty(exports, "MySqlService", { enumerable: true, get: function () { return mySql_service_1.default; } });
