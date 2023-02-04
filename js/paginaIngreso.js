
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

                var usuarioConectado = JSON.parse(data);
               
                if (usuarioConectado.usuario_estado == "ADMIN") {
                    mostarAlerta();
                    window.location.href = PAGINA_ADMIN;
                    localStorage.setItem('USUARIO_CONECTADO', data);
                } else {
                    mostarAlerta();
                    localStorage.setItem('USUARIO_CONECTADO', data);
                }

            }
        }
    });

};


function mostarAlerta() {
    $('.alert').show();

    setTimeout(function () {
        $('.alert').fadeOut('slow');
        location.href = PAGINA_INDEX;
    }, 850);

}