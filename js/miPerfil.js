
var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));

$(document).ready(function () {

    dibujoPerfil();
    $("#inputFileToLoad").change(function () {
        encodeImageFileAsURL(this);
    });

    $('#btn-guardar').click(function () {
        actualizarDatosPerfil();
    });

});


function dibujoPerfil() {
    var htmlContentToAppend = "";
    htmlContentToAppend += `
        <div class="row">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Mis datos</h4>
            </div>
            <div class="col-md-12">
                <!--MOVIDA DE LA IMAGEN-->
                <label class="labels">QR Mercado libre</label>
                <div width="200px" id="usuario-QR-mercado-libre"></div>
                <label class="labels">subir imagen del codigo QR de Mercado Libre
                    <small>
                        <i class="fa fa-arrow-down" aria-hidden="true"></i>
                    </small>
                </label>
                <input  id="inputFileToLoad" class="form-control" type="file"/>
                <!--MOVIDA DE LA IMAGEN FIN-->       
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Nombre</label>
                <input id="usuario-nombre" type="text" class="form-control"  value="` + usuarioConectado.usuario_nombre + `">
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">email</label>
                <input id="usuario-email" type="text" class="form-control text-muted" value="` + usuarioConectado.usuario_email + `" readonly>
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Direccion</label>
                <input id="usuario-direccion" type="text" class="form-control" value="` + usuarioConectado.usuario_direccion + `">
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Telefono</label>
                <input id="usuario-telefono" type="text" class="form-control"  value="` + usuarioConectado.usuario_telefono + `">
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Contraseña</label>
                <input id="usuario-contrasenia" type="password" class="form-control"  value="` + usuarioConectado.usuario_contrasenia + `">
                <br>
            </div>
            <div class="col-md-10">
                <label class="labels"></label>
                <a href="` + PAGINA_MIS_COMPRAS + `">
                    <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Compras</button>
                </a>
                <a href="` + PAGINA_MIS_VENTAS + `">
                    <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Ventas</button>
                </a>
                <a href="` + PAGINA_MIS_PRODUCTOS + `">
                    <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Productos</button>
                </a>
            
                    <button id="btn-guardar" type="button" class="btn btn-outline-dark btn-warning"style="margin-top: 10px;margin-left: 10px;">Guardar</button>

            </div>
            <style>
                a {text-decoration: none;}
                img{padding: 8px;}
            </style>
        </div>
        <br>
        <br>`;

    document.getElementById("contenedor-perfil").innerHTML = htmlContentToAppend;
    //
    var imgMeli = document.createElement('img');
    imgMeli.style.cssText += 'max-width: 150px;';
    imgMeli.src = usuarioConectado.usuario_QR_mercado_libre;
    document.getElementById("usuario-QR-mercado-libre").innerHTML = imgMeli.outerHTML;
    //
}

function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            srcData = fileLoadedEvent.target.result; // <--- data: base64
            var newImage = document.createElement('img');
            newImage.style.cssText += 'max-width: 100px;';
            newImage.src = srcData;
            document.getElementById("usuario-QR-mercado-libre").innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}


function actualizarDatosPerfil() {

    var usuario_contrasenia = $("#usuario-contrasenia").val();
    var usuario_nombre = $("#usuario-nombre").val();
    var usuario_direccion = $("#usuario-direccion").val();
    var usuario_telefono = $("#usuario-telefono").val();
    var usuario_QR_mercado_libre = $("#usuario-QR-mercado-libre").val();
    var usuario_email = $("#usuario-email").val();
    

    return $.ajax({
        url: ACTUALIZO_DATOS_USUARIO,
        type: "POST",
        data: { usuario_contrasenia: usuario_contrasenia, usuario_nombre: usuario_nombre, usuario_direccion: usuario_direccion, usuario_telefono: usuario_telefono, usuario_QR_mercado_libre: usuario_QR_mercado_libre, usuario_email: usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            localStorage.removeItem('USUARIO_CONECTADO');
            localStorage.setItem('USUARIO_CONECTADO', JSON.stringify(data));
        },
        error: function (data) {
            console.log(data);
        },
    });

};

