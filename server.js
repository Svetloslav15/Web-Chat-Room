const express = require('express');
const socket = require('socket.io');
const port = 1112;
const app = express();

app.use(express.static('public'));
const server = app.listen(process.env.PORT || port, () => {console.log(`Listening on port ${port}...`)});

const io = socket(server);

io.on("connection", function (socket) {
    socket.on('message', function (data) {
        socket.broadcast.emit("message", data);
    });

    socket.on("typing", function (data) {
       socket.broadcast.emit('typing', data);
    });
});