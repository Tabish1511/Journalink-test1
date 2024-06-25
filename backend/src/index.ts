const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';
const server = createServer();

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        credentials: true
    }
});

io.on('connection', (socket) => {
    // console.log("A user is connected");
    io.emit("message", "Hello user", socket.id)
})

server.listen(4000, () => {
    console.log("Server started on PORT", 4000)
})