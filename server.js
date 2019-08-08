const express = require('express'); 
const socketio = require('socket.io');

const http = require('http');

const app = express();
const server = http.createServer(app);

const io = socketio.listen(server);//conexion en tiempo real web socket


app.use(express.static('public'))


// servidor local
server.listen(3000, () => {
    console.log('servidor en el puerto 3000');
}); 