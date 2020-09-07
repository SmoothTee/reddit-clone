"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
router.post('/register', middlewares_1.validate(middlewares_1.validateSchemas.register, 'body'), controllers_1.authController.register);
router.post('/login', middlewares_1.validate(middlewares_1.validateSchemas.login, 'body'), controllers_1.authController.login);
router.get('/logout', controllers_1.authController.logout);
exports.auth = router;
//# sourceMappingURL=auth.js.map