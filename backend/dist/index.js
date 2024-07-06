"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = express();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        allowedHeaders: ["X-Requested-With", "Content-Type", "Access-Control-Allow-Origin"],
        credentials: true
    }
});
io.on('connection', (socket) => {
    io.emit("message", "Hello user", socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(4000, () => {
    console.log("Server started on PORT", 4000);
});
