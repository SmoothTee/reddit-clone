"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var ioredis_1 = __importDefault(require("ioredis"));
var connect_redis_1 = __importDefault(require("connect-redis"));
var config_1 = require("./config");
var routes_1 = require("./routes");
var constants_1 = require("./constants");
var initializeExpress = function () {
    var app = express_1.default();
    var redisStore = connect_redis_1.default(express_session_1.default);
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_session_1.default({
        name: config_1.config.sessionName,
        secret: config_1.config.sessionSecret,
        saveUninitialized: false,
        resave: false,
        store: new redisStore({
            client: new ioredis_1.default(),
            ttl: Number(config_1.config.sessionLifetime) / 1000,
        }),
        cookie: {
            httpOnly: true,
            sameSite: true,
            maxAge: Number(config_1.config.sessionLifetime),
            secure: constants_1.__prod__,
        },
    }));
    app.use('/api', routes_1.routes);
    app.listen(config_1.config.port, function () {
        return console.log("Server listening on port " + config_1.config.port);
    });
};
initializeExpress();
//# sourceMappingURL=index.js.map