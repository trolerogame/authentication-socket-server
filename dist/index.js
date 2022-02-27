"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const config_1 = require("./config");
const group_controllers_1 = require("./controllers/group.controllers");
const message_controllers_1 = require("./controllers/message.controllers");
const auth_1 = __importDefault(require("./auth"));
require("./db/connectDB.ts");
// init 
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
// config
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
// routes 
app.post('/group/create', auth_1.default, group_controllers_1.createGroup);
app.get('/group/', group_controllers_1.getGroups);
app.get('/group/:id', auth_1.default, group_controllers_1.getGroup);
// socket
io.on('connect', (socket) => {
    socket.on('message', async (data) => {
        socket.broadcast.emit('data', data);
        await (0, message_controllers_1.createMessage)({
            idUser: data.idUser,
            message: data.message,
            idGroup: data.idGroup
        });
    });
    socket.on('join_group', (data) => {
        socket.broadcast.emit('newMember', data);
    });
});
// listen
server.listen(config_1.config.port || 3000, () => {
    console.log('server listen');
});
