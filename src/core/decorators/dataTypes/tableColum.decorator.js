"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableColumn = void 0;
function TableColumn(_a) {
    var name = _a.columnName, type = _a.type, length = _a.length;
    return function (target, propertyKey) {
        var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        Object.defineProperty(target, propertyKey, __assign(__assign({}, descriptor), { writable: true, configurable: true, enumerable: true, value: "".concat(name, " ").concat(type, "(").concat(length, ")") }));
    };
}
exports.TableColumn = TableColumn;
