
$(document).ready(function () {

    verificoUsuarioConectado();

});

function verificoUsuarioConectado() {

    var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
    if (usuarioConectado == null || usuarioConectado == undefined) {
        alert("debe iniciar sesion");
        window.location.href = PAGINA_INDEX;
    }

}
