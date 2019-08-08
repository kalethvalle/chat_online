// conexion de socket del cliente
$(function (){
    const socket = io();

    // se obtienen los elementos del DOM desde la interface
    $chat = $('#chat');
    $mensajeForm = $('#mensaje-form');
    $mensajeBox = $('#mensaje');

    // capturando los eventos del DOM
    $mensajeForm.submit(function (e) {
        e.preventDefault();
        socket.emit('enviando_mensaje', $mensajeBox.val());
        $mensajeBox.val('');
    });

    // recibe el mensaje para mostrarlo en el cuerpo del chat uno por uno
    socket.on('nuevo_mensaje', function (nuevo_mensaje){
       $chat.append(nuevo_mensaje + '<br/>');
    });
});