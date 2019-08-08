// conexion de socket del servidor
module.exports = function (io) {
    let usuarios = [];
    io.on('connection', socket => {
        // console.log('nuevo usuario conectado');

        socket.on('nuevo_user', (nuevo_user, cb) => {
            console.log(nuevo_user + ' Se ha conectado...');
            if (usuarios.indexOf(nuevo_user) != -1){
                cb(false);
            }else{
                cb(true);
                socket.users = nuevo_user;
                usuarios.push(socket.users);
                actualizaUsuarios();
            }
        });

        // recibe el mensaje del $mensajeForm
        socket.on('enviando_mensaje', function (enviando_mensaje){
            io.sockets.emit('nuevo_mensaje', {
                name: socket.users,
                msg: enviando_mensaje
            });
        });

        socket.on('disconnect', user => {
            if(!socket.users) return;
            console.log(socket.users + ' Se ha desconectado...');
            usuarios.splice(usuarios.indexOf(socket.users), 1);
            actualizaUsuarios();
        });

        function actualizaUsuarios() {
            io.sockets.emit('usuario', usuarios);
        }
    });
}
