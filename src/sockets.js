// conexion de socket del servidor
module.exports = function (io) {
    let usuarios = {};

    io.on('connection', socket => {
        // console.log('nuevo usuario conectado');

        socket.on('nuevo_user', (nuevo_user, cb) => {
            console.log(nuevo_user + ' Se ha conectado...');
            if (nuevo_user in usuarios) {
                cb(false);
            } else {
                cb(true);
                socket.users = nuevo_user;
                usuarios[socket.users] = socket;
                actualizaUsuarios();
            }
        });

        // recibe el mensaje del $mensajeForm
        socket.on('enviando_mensaje', function (enviando_mensaje, cb) {
            var msj = enviando_mensaje.trim();
            // valida si el mensahe en secreto 
            if (msj.substr(0, 2) === '@ ') {
                msj = msj.substr(2);
                const index = msj.indexOf(' ');
                if (index !== -1) {
                    var name = msj.substr(0, index);
                    var msj = msj.substr(index + 1);
                    if (name in usuarios) {
                        usuarios[name].emit('personal', {
                            msj,
                            name: socket.users
                        });
                    } else {
                        cb('Error! Ingresa un usuario valido');
                    }
                } else {
                    cb('Error! Ingresa un mensaje');
                }
            } else {
                // envia el mensaje a todos los usuarios conectados
                io.sockets.emit('nuevo_mensaje', {
                    name: socket.users,
                    msg: enviando_mensaje
                });
            }

        });

        // detecta cuando un usuario es desconectado y lo muestra en la consola del servidor
        socket.on('disconnect', user => {
            if (!socket.users) return;
            console.log(socket.users + ' Se ha desconectado...');
            delete usuarios[socket.users];
            actualizaUsuarios();
        });

        function actualizaUsuarios() {
            io.sockets.emit('usuario', Object.keys(usuarios));
        }
    });
}
