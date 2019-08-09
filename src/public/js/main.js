// conexion socket del cliente
$(function () {
    const socket = io();

    // se obtienen los elementos del DOM desde la interface
    $chat = $('#chat');
    $mensajeForm = $('#mensaje-form');
    $mensajeBox = $('#mensaje');

    // se obtienen los elementos del DOM desde login_form
    const $loginError = $('#login_error');
    const $loginForm = $('#login_form');
    const $loginName = $('#login_name');
    // const name = $loginName;
    const $usuarios = $('#nombre_usuarios');

    // captura evento submit del boton del login
    // para enviar el usuario al servidor <sockets.js>
    $loginForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo_user', $loginName.val(), cp => {
            if (cp) {
                $('#main_login').hide();
                $('#main_contenedor').show();
            } else {
                $loginError.html(`
                   <div class="alert alert-danger">
                      Usuario ya esxiste.
                   </div>
                `);
            }
            $loginName.val('');
        });
    });

    // capturando evento submit del boton chat
    // para enviar el mensaje al servidor <sockets.js>
    $mensajeForm.submit(function (e) {
        e.preventDefault();
        // audioEnviaMensaje();
        socket.emit('enviando_mensaje', $mensajeBox.val(), cb => {
            $chat.append(`
                <p class="alert alert-danger">${cb}</p>
            `);
        });
        $mensajeBox.val('');
    });

    // recibe el mensaje para mostrarlo en el cuerpo del chat uno por uno
    socket.on('nuevo_mensaje', function (nuevo_mensaje) {
        console.log(nuevo_mensaje.userIndex + '->' + nuevo_mensaje.name)
        if (nuevo_mensaje.userIndex === nuevo_mensaje.name) {
            audioEnviaMensaje();
            $chat.append('<b>' + nuevo_mensaje.name + '</b>: ' + nuevo_mensaje.msg + '<br/>');
        } else {
            $chat.append('<b>' + nuevo_mensaje.name + '</b>: ' + nuevo_mensaje.msg + '<br/>');
        }
    });

    socket.on('personal', function (msj_personal) {
        $chat.append(`
           <p class="personal"><b>${msj_personal.name}:</b> ${msj_personal.msj}</p>
        `);
    });

    // muestra en el front todos los usuarios que estan conectados
    socket.on('usuario', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }

        $usuarios.html(html);
    });
});

function audioEnviaMensaje() {
    document.getElementById('sonido').play();
}