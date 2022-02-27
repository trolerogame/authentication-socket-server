"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
//? busca dentro de la cabezeras, la cabezera "token" si se encuentra la verifica con jwt.verify , si es correcto manda da la data del usuario y pasa a la siguiente funcion
const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
        return 'No authorization header found';
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return 'Empty token';
    const validate = await jsonwebtoken_1.default.verify(token, config_1.config.secret);
    if (!validate)
        return 'The token is not valid';
    res.locals.userId = validate?._id;
    next();
};
exports.default = verifyToken;
