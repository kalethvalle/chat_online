const http = require('http');
const path = require('path');

const express = require('express'); 
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

//conexion en tiempo real web socket
const io = socketio.listen(server);

// configuracion puerto del servidor
app.set('port', process.env.PORT || 3000);

// exporta conexion a <sockets.js>
require('./sockets')(io);

// pasa los archivos fijos para mostrarlos en el navegador
app.use(express.static(path.join(__dirname, 'public')));

// incia servidor local 
server.listen(app.get('port'), () => {
    console.log('servidor en el puerto', app.get('port'));
}); 