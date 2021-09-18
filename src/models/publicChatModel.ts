import mongoose from "mongoose";

const publicChatSchema = new mongoose.Schema({
    message: { type: String, required: true },
    name: { type: String, required: true },
    sub: { type: String, required: true },
    timeStamp: { type: String, required: true }
}, { versionKey: false, timestamps: true });

const publicChatModel = mongoose.model("publicChat", publicChatSchema);

export default publicChatModel;