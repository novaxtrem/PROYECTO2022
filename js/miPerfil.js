

var usuarioConectado = "";

$(document).ready(function () {
    usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
    //
    dibujoPerfil();


    $("#inputFileToLoad").change(function () {
        encodeImageFileAsURL(this);
    });


    /*
        $('#cerrar-sesion').click(function () {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    */
});


function dibujoPerfil() {
    var htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <!--MOVIDA DE LA IMAGEN-->
                    <div width="300px" id="imgTest"></div>
                    <input  id="inputFileToLoad" class="form-control" type="file"/>
                    <!--MOVIDA DE LA IMAGEN FIN-->       
                    <span class="text-black-50">` + usuarioConectado.usuario_email + `</span><span> </span>
                </div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-6">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Mis datos</h4>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">Nombre</label>
                            <input type="text" class="form-control"  value="` + usuarioConectado.usuario_nombre + `">
                            <br>
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
                        <div class="col-md-12">
                            <label class="labels"></label>
                            <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Compras</button>
                            <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Ventas</button>
                            <button type="button" class="btn btn-outline-dark"style="margin-top: 10px;margin-left: 10px;">Mis Productos</button>
                        </div>
                    <div class="mt-5 text-center">
                        <button class="btn btn-warning profile-button" type="button">Guardar</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.getElementById("contenedor-perfil").innerHTML = htmlContentToAppend;
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
