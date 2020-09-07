"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    sessionName: process.env.SESSION_NAME,
    sessionSecret: process.env.SESSION_SECRET,
    sessionLifetime: process.env.SESSION_LIFETIME,
};
//# sourceMappingURL=index.js.map