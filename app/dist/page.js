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
var ProgressBar_1 = require("./components/ProgressBar");
var RangeSelector_1 = require("./components/RangeSelector");
var Layout_1 = require("./components/Layout");
var Chart_1 = require("./components/Chart");
function Home() {
    var _this = this;
    // const client = db.connect();
    var _a = react_1.useState(null), sensorData = _a[0], setSensorData = _a[1];
    var _b = react_1.useState(false), inRedZone = _b[0], setInRedZone = _b[1];
    react_1.useEffect(function () {
        var getSensorData = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/get_data', {
                            method: 'GET'
                        }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var dataString, newSensorData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, res.text()];
                                    case 1:
                                        dataString = _a.sent();
                                        newSensorData = JSON.parse(dataString);
                                        setSensorData(newSensorData);
                                        console.log("Fetch data " + newSensorData);
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (err) {
                            console.error("Fetch data error " + err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        getSensorData();
        var interval = setInterval(function () {
            getSensorData();
        }, 5000);
        return function () { return clearInterval(interval); };
    }, []);
    // useEffect(() => {
    //   const fetchSensorData = async () => {
    //     try {
    //       const fetchData = async () => {
    //         const response = await fetch('/api/get_data', {
    //           method: 'GET',
    //         });
    //         if (response.ok) {
    //           const dataString = await response.text(); // Get the JSON string
    //           const data = JSON.parse(dataString); // Parse the JSON string
    //           setSensorData(data); // Set the component state with parsed data
    //           // console.log(data); // Log the parsed data (for debugging)
    //         } else {
    //           console.error('Error fetching data');
    //         }
    //       };
    //       fetchData();
    //       const interval = setInterval(fetchData, 5000); // Refresh data every 2 seconds
    //       return () => clearInterval(interval); // Clear the interval when the component unmounts
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   fetchSensorData();
    // }, []);
    var _c = react_1.useState({ min: 800, max: 1800 }), acceptableRange = _c[0], setAcceptableRange = _c[1];
    var _d = react_1.useState({ min: 21, max: 27 }), acceptableRange2 = _d[0], setAcceptableRange2 = _d[1];
    var _e = react_1.useState({ min: 60, max: 80 }), acceptableRange3 = _e[0], setAcceptableRange3 = _e[1];
    var barRange1 = { lower: 0, upper: 5000 };
    var barRange2 = { lower: 0, upper: 50 };
    var barRange3 = { lower: 0, upper: 100 };
    var _f = react_1.useState(false), isCO2SelectorPopped = _f[0], setIsCO2SelectorPopped = _f[1];
    var _g = react_1.useState(false), isTempSelectorPopped = _g[0], setIsTempSelectorPopped = _g[1];
    var _h = react_1.useState(false), isHumiditySelectorPopped = _h[0], setIsHumiditySelectorPopped = _h[1];
    react_1.useEffect(function () {
        function handleVisibilityChange() {
            if (document.hidden) {
                var redBar = document.querySelector('.progressbar-red');
                if (redBar) {
                    setInRedZone(true);
                }
                else {
                    setInRedZone(false); // Tab is hidden
                }
            }
            else {
                // Reset the title and set inRedZone based on the progress bar
                var redBar = document.querySelector('.progressbar-red');
                if (redBar) {
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
    }, [sensorData]);
    react_1.useEffect(function () {
        // Start a timer to update the title every second if in the red zone
        var timerId = null;
        if (inRedZone) {
            timerId = setInterval(function () {
                document.title =
                    document.title === 'CCS Sensor Data'
                        ? 'ALERT: Sensor Data in Red Zone!'
                        : 'CCS Sensor Data';
            }, 1000); // Update the title every second
        }
        else {
            // Reset the title and clear the timer
            document.title = 'CCS Sensor Data';
            if (timerId) {
                clearInterval(timerId);
            }
        }
        return function () {
            // Cleanup: clear the timer when the component unmounts
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [inRedZone]);
    return (React.createElement(Layout_1["default"], null,
        React.createElement("h1", null,
            React.createElement("strong", null, "Sensor Data")),
        sensorData ? (React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("strong", null, "CO2:"),
                " ",
                sensorData.co2,
                " ppm"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.co2, acceptableRange: acceptableRange, barRange: barRange1, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }),
            React.createElement("p", null,
                React.createElement("strong", null, "Temperature:"),
                " ",
                sensorData.temperature,
                " \u00B0C"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.temperature, acceptableRange: acceptableRange2, barRange: barRange2, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }),
            React.createElement("p", null,
                React.createElement("strong", null, "Humidity:"),
                " ",
                sensorData.humidity,
                " RH"),
            React.createElement(ProgressBar_1["default"], { value: sensorData.humidity, acceptableRange: acceptableRange3, barRange: barRange3, onRedZone: function (inRedZone) { return setInRedZone(inRedZone); } }),
            React.createElement("button", { onClick: function () { return setIsCO2SelectorPopped(!isCO2SelectorPopped); } }, "Range selection for CO2"),
            isCO2SelectorPopped ? React.createElement(RangeSelector_1["default"], { range: acceptableRange, setRange: setAcceptableRange, barRange: barRange1 }) : null,
            React.createElement("br", null),
            React.createElement("button", { onClick: function () { return setIsTempSelectorPopped(!isTempSelectorPopped); } }, "Range selection for temperature"),
            isTempSelectorPopped ? React.createElement(RangeSelector_1["default"], { range: acceptableRange2, setRange: setAcceptableRange2, barRange: barRange2 }) : null,
            React.createElement("br", null),
            React.createElement("button", { onClick: function () { return setIsHumiditySelectorPopped(!isHumiditySelectorPopped); } }, "Range selection for humidity"),
            isHumiditySelectorPopped ? React.createElement(RangeSelector_1["default"], { range: acceptableRange3, setRange: setAcceptableRange3, barRange: barRange3 }) : null)) : (React.createElement("p", null, "Loading data...")),
        React.createElement(Chart_1["default"], null)));
}
exports["default"] = Home;
