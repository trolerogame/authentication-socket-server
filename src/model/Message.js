"use strict";
exports.__esModule = true;
exports.Message = void 0;
var mongoose_1 = require("mongoose");
var message = new mongoose_1.Schema({
    message: { type: String, required: true },
    idUser: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, "default": Date.now() },
    idGroup: { type: mongoose_1.Schema.Types.ObjectId }
});
exports.Message = (0, mongoose_1.model)('messages', message);
