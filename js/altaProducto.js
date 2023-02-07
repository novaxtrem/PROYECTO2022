

var producto_nombre, producto_id_vendedor, producto_categoria, producto_descripcion, producto_precio, producto_stock, producto_locacion_logitud, producto_locacion_latitud, producto_locacion_alias, producto_imagen, srcData;
//
usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
//

$(document).ready(function () {

    $('#categorias-desplegable').on('change', function () {
        producto_categoria = $("#categorias-desplegable option:selected").val();
    });
    //
    $('#inputFileToLoad').on('change', function () {
        encodeImageFileAsURL();
    });
    /////////MAPA
    var marker = L.marker();
    var map = L.map('map').setView([-32.60, -56], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.on('click', onMapClick);
    function onMapClick(e) {

        //con este metodo solo permito un marcador
        marker.remove();
        //
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        //console.log(e);
        producto_locacion_logitud = e.latlng.lng;
        producto_locacion_latitud = e.latlng.lat;
    }
    /////////IMAGEN
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
    ///////////IMAGEN

    $("#btn-agregar-producto").click(function () {

        if (verificoCampos() === true) {
            agregoProducto();
        } else {
            alert("debe completar la informacion del producto");
        }
    });

});

function agregoProducto() {

    $.ajax({
        url: ALTA_PRODUCTO,
        type: "post",
        data: { producto_id_vendedor: usuarioConectado.usuario_email, producto_nombre: $("#nombre-producto").val(), producto_categoria: producto_categoria, producto_descripcion: $("#descripcion-producto").val(), producto_precio: $("#precio-producto").val(), producto_stock: $("#stock-producto").val(), producto_locacion_logitud: producto_locacion_logitud, producto_locacion_latitud: producto_locacion_latitud, producto_locacion_alias: producto_locacion_alias, producto_imagen: srcData },
        success: function (data) {
            mostarAlerta();
        }
    });
};

function mostarAlerta() {
    $('.alert').show();

    setTimeout(function () {
        $('.alert').fadeOut('slow');
        location.reload();
    }, 850);

}

function verificoCampos() {

    if ((producto_locacion_logitud == undefined) || (producto_locacion_latitud) == undefined) {
        producto_locacion_logitud = 0;
        producto_locacion_latitud = 0;
        producto_locacion_alias = "sin nombre";
    }
    //
    if (producto_categoria == undefined) {
        producto_categoria = $("#categorias-desplegable option:selected").val();
    } else {
        producto_categoria = $("#categorias-desplegable option:selected").val();
    }
    //
    if (srcData == undefined || srcData == null || srcData == "") {
        producto_imagen = "0";
    } else {
        producto_imagen = srcData;
    }
    //
    producto_nombre = $("#nombre-producto").val();
    producto_descripcion = $("#descripcion-producto").val();
    producto_precio = $("#precio-producto").val();
    producto_stock = $("#stock-producto").val();
    //
    if (usuarioConectado.usuario_email && producto_nombre && producto_categoria && producto_descripcion && producto_precio && producto_stock) {
        return true;
    }
}