const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';
const app = express();
const server = createServer(app);


const allowedOrigins = ["http://localhost:3000", "https://journalink-omega.vercel.app/"];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        allowedHeaders: ["X-Requested-With", "Content-Type", "Access-Control-Allow-Origin"],
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
































































// const cors = require('cors');



// // Use CORS middleware with specific options
// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['X-Requested-With', 'Content-Type', 'my-custom-header']
// }));