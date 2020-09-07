"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knexConfig = require('./knexfile');
const knex_1 = __importDefault(require("knex"));
const config_1 = require("../config");
exports.db = knex_1.default(knexConfig[config_1.config.env]);
//# sourceMappingURL=index.js.map