"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const router = express_1.Router();
router.use('/auth', auth_1.auth);
exports.routes = router;
//# sourceMappingURL=index.js.map