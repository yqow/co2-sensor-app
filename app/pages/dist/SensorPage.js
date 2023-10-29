'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var ProgressBar_1 = require("../components/ProgressBar");
function Home(_a) {
    var _this = this;
    var location = _a.location;
    var _b = react_1.useState(null), sensorData = _b[0], setSensorData = _b[1];
    var _c = react_1.useState(false), inRedZone = _c[0], setInRedZone = _c[1];
    react_1.useEffect(function () {
        var fetchSensorData = function () { return __awaiter(_this, void 0, void 0, function () {
            var fetchData, interval_1;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
                        var response, dataString, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fetch("/api/get_data/" + location, {
                                        method: 'GET'
                                    })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.text()];
                                case 2:
                                    dataString = _a.sent();
                                    data = JSON.parse(dataString);
                                    setSensorData(data); // Set the component state with parsed data
                                    return [3 /*break*/, 4];
                                case 3:
                                    console.error('Error fetching data');
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                    fetchData();
                    interval_1 = setInterval(fetchData, 2000);
                    return [2 /*return*/, function () { return clearInterval(interval_1); }]; // Clear the interval when the component unmounts
                }
                catch (error) {
                    console.error('Error fetching data:', error);
                }
                return [2 /*return*/];
            });
        }); };
        fetchSensorData();
    }, [location]);
    react_1.useEffect(function () {
        function handleVisibilityChange() {
            if (document.hidden) {
                var redBar = document.querySelectorAll('.progressbar.red');
                if (redBar.length > 0) {
                    setInRedZone(true);
                }
                setInRedZone(false); // Tab is hidden
            }
            else {
                // Reset the title and set inRedZone based on the progress bar
                var redBar = document.querySelectorAll('.progressbar.red');
                if (redBar.length > 0) {
                    setInRedZone(true);
                }
                else {
                    setInRedZone(false);
                }
            }
        }
        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);
        // Clear the timer when the component unmounts
        return function () {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [inRedZone]);
    return (React.createElement("div", null,
        React.createElement("h1", null,
            React.createElement("strong", null,
                "Sensor Data @ ",
                location)),
        sensorData ? (React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("strong", null, "CO2:"),
                " ",
                sensorData.co2,
                " ppm"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.co2, acceptableRange: { min: 800, max: 1800 }, barRange: { lower: 0, upper: 3000 }, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }),
            React.createElement("p", null,
                React.createElement("strong", null, "Temperature:"),
                " ",
                sensorData.temperature,
                " \u00B0C"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.temperature, acceptableRange: { min: 21.1, max: 26.6 }, barRange: { lower: 16, upper: 50 }, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }),
            React.createElement("p", null,
                React.createElement("strong", null, "Humidity:"),
                " ",
                sensorData.humidity,
                " RH"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.humidity, acceptableRange: { min: 55, max: 80 }, barRange: { lower: 0, upper: 100 }, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }))) : (React.createElement("p", null, "Loading data..."))));
}
exports["default"] = Home;
