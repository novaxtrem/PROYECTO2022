
$(document).ready(function () {

    $("#btn-registrar-usuario").click(function () {
        usuario_email = $("#usuario-email").val();
        usuario_contrasenia = $("#usuario-contrasenia").val();
        usuario_nombre = $("#usuario-nombre").val();
        usuario_direccion = $("#usuario-direccion").val();
        usuario_telefono = $("#usuario-telefono").val();
        usuario_QR_mercado_libre = '1'//$("#precio-producto").val();
        usuario_comercio = $("input[name='local-comercial']:checked").val();
        //
        agregoUsuarios(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre, usuario_comercio);
    });
});

function agregoUsuarios(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre, usuario_comercio) {
    $.ajax({
        url: AGREGO_USUARIOS,
        type: "post",
        data: { usuario_email: usuario_email, usuario_contrasenia: usuario_contrasenia, usuario_nombre: usuario_nombre, usuario_direccion: usuario_direccion, usuario_telefono: usuario_telefono, usuario_QR_mercado_libre: usuario_QR_mercado_libre, usuario_comercio: usuario_comercio },
        success: function (data) {
            console.log(data);
        }
    });
};
