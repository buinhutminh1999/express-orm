"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failCode = exports.successCode = void 0;
const successCode = (status, data, message) => {
    return {
        status,
        data,
        message
    };
};
exports.successCode = successCode;
const failCode = (status, message) => {
    return {
        status,
        message
    };
};
exports.failCode = failCode;
//# sourceMappingURL=response.js.map