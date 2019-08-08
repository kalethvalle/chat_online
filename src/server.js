const express = require('express'); 
const socketio = require('socket.io');

const http = require('http');

const app = express();
const server = http.createServer(app);

//conexion en tiempo real web socket
const io = socketio.listen(server);

io.on('connection', socket => {
    console.log('nuevo usuario conectado');
});

// pasa los archivos fijos para mostrarlos en el
app.use(express.static('public'))

// incia servidor local 
server.listen(3000, () => {
    console.log('servidor en el puerto 3000');
}); 