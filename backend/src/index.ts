const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';
const app = express();
const server = createServer(app);

// Set the allowed origins based on the environment
const allowedOrigins = ["http://localhost:3000", "https://journalink-6batn230t-tabish1511s-projects.vercel.app/"];

const io = new Server(server, {
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
