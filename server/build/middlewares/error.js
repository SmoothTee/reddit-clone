"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
var appError_1 = require("../utils/appError");
exports.error = function (err, _req, res, _next) {
    if (err instanceof appError_1.AppError) {
        res.status(err.statusCode).json({ message: err.message, data: err.data });
        return;
    }
    res.status(500).json({
        message: 'Something went wrong on the server. Please contact our support.',
    });
};
//# sourceMappingURL=error.js.map