'use client';
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var react_slider_1 = require("react-slider");
var styled_components_1 = require("styled-components");
var StyledSlider = styled_components_1["default"](react_slider_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 100%;\n    height: 25px;\n"], ["\n    width: 100%;\n    height: 25px;\n"])));
var StyledThumb = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    height: 25px;\n    line-height: 25px;\n    width: 25px;\n    text-align: center;\n    background-color: #000;\n    color: #fff;\n    border-radius: 50%;\n    cursor: grab;\n"], ["\n    height: 25px;\n    line-height: 25px;\n    width: 25px;\n    text-align: center;\n    background-color: #000;\n    color: #fff;\n    border-radius: 50%;\n    cursor: grab;\n"])));
var Thumb = function (props, state) { return React.createElement(StyledThumb, __assign({}, props), state.valueNow); };
var StyledTrack = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    top: 0;\n    bottom: 0;\n    background: ", ";\n    border-radius: 999px;\n"], ["\n    top: 0;\n    bottom: 0;\n    background: ", ";\n    border-radius: 999px;\n"])), function (props) { return (props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#f00'); });
var Track = function (props, state) { return React.createElement(StyledTrack, __assign({}, props, { index: state.index })); };
var StyledContainer = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    resize: horizontal;\n    overflow: auto;\n    width: 50%;\n    max-width: 100%;\n    padding-right: 8px;\n"], ["\n    resize: horizontal;\n    overflow: auto;\n    width: 50%;\n    max-width: 100%;\n    padding-right: 8px;\n"])));
var ResizableSlider = function (_a) {
    var range = _a.range, setRange = _a.setRange, barRange = _a.barRange;
    var onChange = function (val) {
        setRange({ min: val[0], max: val[1] });
    };
    return (React.createElement(StyledContainer, null,
        React.createElement(StyledSlider, { defaultValue: [range.min, range.max], renderTrack: Track, renderThumb: Thumb, min: barRange.lower, max: barRange.upper, onChange: onChange })));
};
exports["default"] = ResizableSlider;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
