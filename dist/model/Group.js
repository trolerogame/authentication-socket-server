"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = require("mongoose");
const messageGroup = new mongoose_1.Schema({
    admin: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: 'string', required: true },
    description: { type: 'string' },
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'messages'
        },
    ],
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
const User = new mongoose_1.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    phone: String,
    passwordLength: String,
    photo: String,
});
(0, mongoose_1.model)('User', User);
exports.Group = (0, mongoose_1.model)('groups', messageGroup);
