"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    port: process.env.PORT,
    server: process.env.SERVER,
    secret: process.env.SECRET
};
