"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = express();
const server = (0, http_1.createServer)(app);
// Set the allowed origins based on the environment
// const allowedOrigins = ["http://localhost:3000", "https://journalink-6batn230t-tabish1511s-projects.vercel.app/"];
const allowedOrigins = ["http://localhost:3000", "https://journalink-omega.vercel.app/"];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log("A user is connected");
    io.emit("message", "Hello user", socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
server.listen(4000, () => {
    console.log("Server started on PORT", 4000);
});
