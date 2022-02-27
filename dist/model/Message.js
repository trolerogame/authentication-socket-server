"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const message = new mongoose_1.Schema({
    message: { type: String, required: true },
    idUser: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now() },
    idGroup: { type: mongoose_1.Schema.Types.ObjectId }
});
exports.Message = (0, mongoose_1.model)('messages', message);
