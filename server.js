const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('files'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});


io.on("connection", function (socket) {
    socket.on("newuser", username => {
        console.log(username + " Join!")
        socket.broadcast.emit("update", username);
    })

    socket.on("message", data => {
        socket.broadcast.emit("message", data);
    })

    socket.on("figure", data => {
        socket.broadcast.emit("URL_FIG", data);
        console.log(data)
    })

})

io.on('connection', (socket) => {
    socket.on('figure', (fg) => {
        socket.broadcast.emit('figure', fg);
    });
});