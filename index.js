const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const PORT = 8000;

const app = express()
const httpServer = createServer(app)

httpServer.listen(PORT, () => {
    console.log("Server is runnig on port", PORT)
})
app.use(express.static(__dirname + '/public'))

const io = new Server(httpServer, {}) // cria o servidor websocket

let messages = []
io.on('connection', (socket) => { // escuta o evento de conexao recebendo o socket
    console.log("ID:", socket.client.id);

    io.emit('repassa', messages) // emite o evento 'repassa'

    socket.on('message', (msg) => { // escuta o evento 'message
        messages.push(msg)
        io.emit('repassa', messages) // emite o evento 'repassa'
    })
})