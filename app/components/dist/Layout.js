"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var Layout = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("main", null, children),
        react_1["default"].createElement(Footer_1["default"], null)));
};
exports["default"] = Layout;
