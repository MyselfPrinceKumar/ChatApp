const express = require('express');
const app = express();
const path = require('path')
const http = require('http').createServer(app);
const port = process.env.port || 3000
http.listen(port, () => {
    console.log("Listening on the port " + port)
});

const dirPath = path.join(__dirname)
app.use(express.static(dirPath + '/public'))
app.get('/', (req, res) => {
    res.sendFile(`${dirPath}/index.html`)
})

// Socket 
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log("Socket Connected");
    socket.on('disconnect', () => {
        console.log("Disconnected")
    })
    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
})