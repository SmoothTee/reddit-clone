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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../database");
const appError_1 = require("../utils/appError");
const serializer_1 = require("../utils/serializer");
exports.register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(data.password, 12);
    const { confirmPassword: _ } = data, rest = __rest(data, ["confirmPassword"]);
    try {
        const user = (yield database_1.db('users').insert(Object.assign(Object.assign({}, rest), { password: hashedPassword }), '*'))[0];
        return serializer_1.userSerializer(user);
    }
    catch (err) {
        if (err.code === '23505') {
            if (err.detail.includes('username')) {
                const userWithEmail = yield database_1.db('users')
                    .first()
                    .where({ email: data.email });
                if (userWithEmail) {
                    throw new appError_1.AppError(409, 'Duplication error', {
                        username: 'Username is already taken',
                        email: 'Email is already taken',
                    });
                }
                else {
                    throw new appError_1.AppError(409, 'Duplication error', {
                        username: 'Username is already taken',
                    });
                }
            }
            else {
                throw new appError_1.AppError(409, 'Duplication error', {
                    email: 'Email is already taken',
                });
            }
        }
        else {
            throw err;
        }
    }
});
exports.login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = data;
    const user = yield database_1.db('users').first().where({ username });
    if (!user) {
        throw new appError_1.AppError(404, 'User not found', {
            username: 'Username not found',
        });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        throw new appError_1.AppError(422, 'Invalid Password', {
            password: 'Password is invalid',
        });
    }
    return serializer_1.userSerializer(user);
});
//# sourceMappingURL=auth.js.map