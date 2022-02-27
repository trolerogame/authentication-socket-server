"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const Message_1 = require("../model/Message");
const Group_1 = require("../model/Group");
const createMessage = async (create) => {
    const { idGroup } = create;
    try {
        const message = await Message_1.Message.create({
            ...create,
        });
        await Group_1.Group.findByIdAndUpdate(idGroup, {
            $push: { messages: [message._id] },
        });
        const newMessage = await Message_1.Message.findById(message._id).populate({
            path: 'idUser',
            select: 'email photo _id',
        });
        return newMessage;
    }
    catch (er) {
        return null;
    }
};
exports.createMessage = createMessage;
