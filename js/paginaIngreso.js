
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
        cache: false,
        async: false,
        data: { usuario_email: usuario_email, usuario_pass: usuario_pass },
        success: function (data) {
            //console.log($.trim(data));
            if (String(data) == String("null")) {
                alert("error con el usuario o contraseña");
                $("#usuario-email").val("");
                $("#usuario-pass").val("");
            } else {
                localStorage.setItem('USUARIO_CONECTADO', data);
                location.href = PAGINA_INDEX;
            }
        }
    });

};