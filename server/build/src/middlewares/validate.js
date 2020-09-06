"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateSchemas = void 0;
var joi_1 = __importDefault(require("joi"));
var utils_1 = require("../utils");
var appError_1 = require("../utils/appError");
exports.validateSchemas = {
    register: joi_1.default.object({
        username: joi_1.default.string().min(2).max(32).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password')),
    }),
};
exports.validate = function (schema, prop) {
    return utils_1.catchError(function (req, _res, next) {
        var error = schema.validate(req[prop], { abortEarly: false }).error;
        if (error) {
            throw new appError_1.AppError(422, 'Invalid input values.', formatError(error));
        }
        next();
    });
};
var formatError = function (error) {
    return error.details.reduce(function (acc, curr) {
        acc[curr.path[0]] = curr.message;
        return acc;
    }, {});
};
//# sourceMappingURL=validate.js.map