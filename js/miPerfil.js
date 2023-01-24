


$(document).ready(function () {
    var usuarioConectado = "";
    usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
    //
    dibujoPerfil();

    $("#inputFileToLoad").change(function () {
        encodeImageFileAsURL(this);
    });


});


function dibujoPerfil() {
    var htmlContentToAppend = "";
    //
    
    htmlContentToAppend += `
        <div class="row">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Mis datos</h4>
            </div>
            
            <div class="col-md-12">
            <!--MOVIDA DE LA IMAGEN-->
            <label class="labels">QR Mercado libre</label>
            <div width="300px" id="imgTest"></div>
            <input  id="inputFileToLoad" class="form-control" type="file"/>
            <!--MOVIDA DE LA IMAGEN FIN-->       
            <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Nombre</label>
                <input type="text" class="form-control"  value="` + usuarioConectado.usuario_nombre + `">
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">email</label>
                <span class="text-black-50">` + usuarioConectado.usuario_email + `</span>
            </div>
            <div class="col-md-12">
                <label class="labels">Direccion</label>
                <input type="text" class="form-control" value="` + usuarioConectado.usuario_direccion + `">
                <br>
            </div>
            <div class="col-md-12">
                <label class="labels">Telefono</label>
                <input type="text" class="form-control"  value="` + usuarioConectado.usuario_telefono + `">
                <br>
            </div>
            <div class="col-md-10">
                <label class="labels"></label>
                <a href="misCompras.html"><button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Compras</button></a>
                <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Ventas</button>
                <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Productos</button>
            </div>
            <div class="mt-5 text-center">
                <button class="btn btn-warning profile-button" type="button">Guardar</button>
            </div>
        </div>`;

    document.getElementById("contenedor-perfil").innerHTML = htmlContentToAppend;
    //
    var imgMeli = document.createElement('img');
    imgMeli.style.cssText += 'max-width: 300px;';
    imgMeli.src = usuarioConectado.usuario_QR_mercado_libre;
    document.getElementById("imgTest").innerHTML = imgMeli.outerHTML;
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
            newImage.style.cssText += ' max-width: 100px;';
            newImage.src = srcData;
            document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}
