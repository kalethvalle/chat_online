// conexion socket del cliente
$(function (){
    const socket = io();

    // se obtienen los elementos del DOM desde la interface
    $chat = $('#chat');
    $mensajeForm = $('#mensaje-form');
    $mensajeBox = $('#mensaje');

    // se obtienen los elementos del DOM desde login_form
    const $loginError = $('#login_error');
    const $loginForm = $('#login_form');
    const $loginName = $('#login_name');
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
        socket.emit('enviando_mensaje', $mensajeBox.val());
        $mensajeBox.val('');
    });

    // recibe el mensaje para mostrarlo en el cuerpo del chat uno por uno
    socket.on('nuevo_mensaje', function (nuevo_mensaje){
       $chat.append('<b>' + nuevo_mensaje.name + '</b>: ' + nuevo_mensaje.msg + '<br/>');
    });

    socket.on('usuario', data => {
        let html = '';
        for(let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $usuarios.html(html);
    });
});