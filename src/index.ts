import express from "express";
// const express = require('express');
const app = express();

import http from "http";
const server = http.createServer(app);

import { Server, Socket } from "socket.io";
const io = new Server(server, { cors: { origin: "*" } });

import mongoose from "mongoose";
import publicChatModel from "./models/publicChatModel";

import cors from 'cors';

app.use( cors({ origin: "*" }))

io.on("connection", (socket: Socket) => {
    
	socket.on("public", async (payload) => {
		const publicChat = payload;
		const publicChatSaved = await new publicChatModel(publicChat).save();
		console.log(publicChatSaved);
		io.emit("public", { ...payload });
	});
});

mongoose.connect("mongodb+srv://dbAdmin:adminpassword@lets-chat.6qo7h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(() => {
	server.listen(process.env.PORT, () => {
		console.log("It's on b*tch!");
	});
})

app.get("/", (req, res) => {
	res.send("It's on b*tch!");
});

app.get("/publicChats", async (req, res) => {
	try {
		const publicChatDocs = await publicChatModel.find();
		res.send(publicChatDocs);
	} catch (error) {
		console.log(error)
	}
})
