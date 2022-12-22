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

        //

        agregoUsuarios(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre);
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
            //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);

            //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        }
        fileReader.readAsDataURL(fileToLoad);

    }


}