"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Progressbar = function (_a) {
    var value = _a.value, acceptableRange = _a.acceptableRange, barRange = _a.barRange;
    var percentage = 0;
    percentage = ((value - barRange.lower) / (barRange.upper - barRange.lower)) * 100;
    var progressColorClass = 'green'; // Default to green
    if (value > acceptableRange.min && value < acceptableRange.max) {
        progressColorClass = 'light-green';
    }
    else if (value > acceptableRange.min * 0.9 && value < acceptableRange.max * 1.1) {
        progressColorClass = 'yellow'; // If outside +-10%, set to yellow
    }
    else {
        progressColorClass = 'red';
    }
    react_1.useEffect(function () {
        // Start a timer to update the title every second if in the red zone
        var timerId = null;
        if (progressColorClass === 'red') {
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
    }, [progressColorClass]);
    return (react_1["default"].createElement("div", { className: "progressbar-container" },
        react_1["default"].createElement("div", { className: "progressbar " + progressColorClass, style: { width: percentage + "%" } },
            react_1["default"].createElement("style", { jsx: true }, "\n          .progressbar-container {\n            width: 100%;\n            height: 20px;\n            border: 1px solid #ccc;\n            position: relative;\n          }\n          .progressbar {\n            height: 100%;\n            transition: width 0.5s;\n          }\n          .light-green {\n            background-color: lightgreen;\n          }\n          .yellow {\n            background-color: yellow;\n          }\n          .red {\n            background-color: red;\n            animation: blinker 1s linear infinite;\n          }\n          @keyframes blinker {\n            0% {\n              background-color: red;\n            }\n            50% {\n              background-color: transparent;\n            }\n            100% {\n              background-color: red;\n            }\n        "))));
};
exports["default"] = Progressbar;
