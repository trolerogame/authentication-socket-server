"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroup = exports.getGroups = exports.createGroup = void 0;
const Group_1 = require("../model/Group");
const createGroup = async (req, res) => {
    const { name: nameGroup, description } = req.body;
    try {
        const newGroup = await Group_1.Group.create({
            admin: res.locals.userId,
            name: nameGroup,
            description,
            members: [res.locals.userId],
        });
        res.json(newGroup);
    }
    catch (err) {
        console.log('err');
        res.status(404).send('name required');
    }
    res.locals.userId = '';
};
exports.createGroup = createGroup;
const getGroups = async (req, res) => {
    try {
        let groups = await Group_1.Group.find();
        groups = groups.map((group) => ({ name: group.name, _id: group._id }));
        res.json(groups);
    }
    catch (err) {
        res.status(403).json({});
    }
    res.locals.userId = '';
};
exports.getGroups = getGroups;
const getGroup = async (req, res) => {
    const idGroup = req.params.id;
    try {
        const dataGroup = await Group_1.Group.findById(idGroup);
        if (dataGroup.members !== res.locals.userId)
            await Group_1.Group.findByIdAndUpdate(idGroup, {
                $addToSet: { members: [res.locals.userId] },
            });
        const newDataGroup = await Group_1.Group.findById(idGroup)
            .populate({ path: 'members admin', select: 'username photo' })
            .populate({ path: 'messages', populate: {
                path: 'idUser',
                select: 'photo username _id'
            } });
        res.json(newDataGroup);
    }
    catch (err) {
        console.log(err);
        res.status(403).json({});
    }
    res.locals.userId = '';
};
exports.getGroup = getGroup;
