"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const publicChatSchema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    name: { type: String, required: true },
    sub: { type: String, required: true },
    timeStamp: { type: String, required: true }
}, { versionKey: false, timestamps: true });
const publicChatModel = mongoose_1.default.model("publicChat", publicChatSchema);
exports.default = publicChatModel;
