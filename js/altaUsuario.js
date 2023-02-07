var usuario_QR_mercado_libre;


$(document).ready(function () {

    $('#inputFileToLoad').on('change', function () {
        encodeImageFileAsURL();
    });

    $("#btn-registrar-usuario").click(function () {

        usuario_email = $("#usuario-email").val();
        usuario_contrasenia = $("#usuario-contrasenia").val();
        usuario_nombre = $("#usuario-nombre").val();
        usuario_direccion = $("#usuario-direccion").val();
        usuario_telefono = $("#usuario-telefono").val();
        //
        if (checkmail(usuario_email)){
            if (usuario_contrasenia && usuario_nombre && usuario_direccion && usuario_telefono)
            {
                agregoUsuarios(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre);
                alert("Usuario registrado exitosamente")
                }
         else alert("Debe completar todos los datos para registrar un usuario nuevo")
        }
        
    });
});

function agregoUsuarios(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre) {
    $.ajax({
        url: ALTA_USUARIO,
        type: "post",
        data: { usuario_email: usuario_email, usuario_contrasenia: usuario_contrasenia, usuario_nombre: usuario_nombre, usuario_direccion: usuario_direccion, usuario_telefono: usuario_telefono, usuario_QR_mercado_libre: usuario_QR_mercado_libre },
        success: function (data) {
            console.log(data);
        }
    });
};

function encodeImageFileAsURL() {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.style.cssText += ' max-width: 100px;';
            newImage.src = srcData;
            //
            usuario_QR_mercado_libre = newImage.src;
            //
            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}



function checkmail(mail) {

  var expresion = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!mail.match(expresion)) {

     alert("El email no es correcto!");

    return false;

  }

   return true;

}