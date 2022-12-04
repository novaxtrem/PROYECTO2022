
$(document).ready(function () {

    $('#btn-ingresar').click(function () {
        usuario_email = $("#usuario-email").val();
        usuario_pass = $("#usuario-pass").val();
        //
        inicioSesion(usuario_email, usuario_pass);
    });


});

function inicioSesion(usuario_email, usuario_pass) {
    return $.ajax({
        url: INICIAR_SESION,
        type: "POST",
        data: { usuario_email: usuario_email, usuario_pass: usuario_pass },
        async: false,
        success: function (data) {
            localStorage.setItem('USUARIO_CONECTADO', data);
            location.href = 'index.html';
        }
    });
};