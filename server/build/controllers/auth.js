"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
exports.register = utils_1.catchError((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield services_1.authService.register(req.body);
    req.session.userId = user.id;
    res.json({ user });
}));
exports.login = utils_1.catchError((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield services_1.authService.login(req.body);
    req.session.userId = user.id;
    res.json({ user });
}));
//# sourceMappingURL=auth.js.map