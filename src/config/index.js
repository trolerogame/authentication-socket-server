"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    port: process.env.PORT,
    server: process.env.SERVER,
    secret: process.env.SECRET
};
