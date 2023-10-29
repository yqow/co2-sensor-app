"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
require("bootstrap/dist/css/bootstrap.min.css");
var react_cookie_1 = require("react-cookie");
var Header = function () {
    var _a = react_cookie_1.useCookies(["userInfo"]), cookie = _a[0], setCookie = _a[1], removeCookie = _a[2];
    var _b = react_1.useState(false), isSignedIn = _b[0], setIsSignedIn = _b[1];
    return (react_1["default"].createElement(react_bootstrap_1.Navbar, { expand: "lg" },
        react_1["default"].createElement(react_bootstrap_1.Container, { className: "ms-0" },
            react_1["default"].createElement(react_bootstrap_1.Navbar.Brand, { href: "/" }, "Home"),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
            react_1["default"].createElement(react_bootstrap_1.Navbar.Collapse, { id: "basic-navbar-nav" },
                react_1["default"].createElement(react_bootstrap_1.Nav, { className: "me-auto" },
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/about" }, "About"),
                    react_1["default"].createElement(react_bootstrap_1.Nav.Link, { href: "/contact" }, "Contact"),
                    react_1["default"].createElement(react_bootstrap_1.NavDropdown, { title: "User", id: "basic-nav-dropdown" },
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "/signin" }, "Sign In"),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Divider, null),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "/signup" }, "Sign Up"),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Divider, null),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown.Item, { href: "#action/3.3" }, "Log Out")))))));
};
exports["default"] = Header;
