"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var knex_1 = __importDefault(require("knex"));
var path_1 = __importDefault(require("path"));
var config_1 = require("../config");
var knexConfig = {
    client: 'pg',
    connection: {
        host: config_1.config.dbHost,
        user: config_1.config.dbUser,
        password: config_1.config.dbPassword,
        database: config_1.config.dbName,
    },
    migrations: {
        directory: path_1.default.join(__dirname, '/src/database/migrations'),
    },
};
exports.db = knex_1.default(knexConfig);
//# sourceMappingURL=index.js.map