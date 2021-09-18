"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const express = require('express');
const app = express_1.default();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const mongoose_1 = __importDefault(require("mongoose"));
const publicChatModel_1 = __importDefault(require("./models/publicChatModel"));
const cors_1 = __importDefault(require("cors"));
app.use(cors_1.default({ origin: "*" }));
io.on("connection", (socket) => {
    socket.on("public", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const publicChat = payload;
        const publicChatSaved = yield new publicChatModel_1.default(publicChat).save();
        console.log(publicChatSaved);
        io.emit("public", Object.assign({}, payload));
    }));
});
mongoose_1.default.connect("mongodb+srv://dbAdmin:adminpassword@lets-chat.6qo7h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
    server.listen(3000, () => {
        console.log("It's on b*tch!");
    });
});
app.get("/", (req, res) => {
    res.send("It's on b*tch!");
});
app.get("/publicChats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicChatDocs = yield publicChatModel_1.default.find();
        res.send(publicChatDocs);
    }
    catch (error) {
        console.log(error);
    }
}));
