"use strict";
exports.__esModule = true;
exports.ChartContext = void 0;
var react_1 = require("react");
var ChartContext = react_1.createContext({
    labels: [],
    datasets: [
        {
            label: 'CO2',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
        },
        {
            label: 'Temperature',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
        },
        {
            label: 'Humidity',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
        },
    ]
});
exports.ChartContext = ChartContext;
