"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var router = express_1.Router();
router.post('/register', middlewares_1.validate(middlewares_1.validateSchemas.register, 'body'), controllers_1.authController.register);
exports.auth = router;
//# sourceMappingURL=auth.js.map