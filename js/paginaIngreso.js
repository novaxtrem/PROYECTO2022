
usuario = new Usuario;

$(document).ready(function () {

    $('#btn-ingresar').click(function () {

        usuario_email = $("#usuario-email").val();
        usuario_pass = $("#usuario-pass").val();


        inicioSesion(usuario_email, usuario_pass);

    });



    function inicioSesion(usuario_email, usuario_pass) {


        return $.ajax({
            url: INICIAR_SESION,
            type: "POST",
            data: { usuario_email: usuario_email, usuario_pass: usuario_pass },
            async: false,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {


                    usuario.usuario_nombre = data[i].usuario_nombre;



                    localStorage.setItem('USUARIO_CONECTADO', JSON.stringify(usuario));

                }
                //window.location.href = 'index.html';
            }

        });

    };


});