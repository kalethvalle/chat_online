// conexion de socket del servidor
module.exports = function (io) {
    io.on('connection', socket => {
        console.log('nuevo usuario conectado');

        // recibe el mensaje del $mensajeForm
        socket.on('enviando_mensaje', function (enviando_mensaje){
            io.sockets.emit('nuevo_mensaje', enviando_mensaje);
        });
    });
}
