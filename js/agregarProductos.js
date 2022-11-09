

var producto_nombre, producto_id_vendedor, producto_categoria, producto_descripcion, producto_precio, producto_stock, producto_locacion_logitud, producto_locacion_latitud, producto_locacion_alias, producto_imagen, srcData;
//

$(document).ready(function () {



    $('#categorias-desplegable').on('change', function () {
        producto_categoria = $("#categorias-desplegable option:selected").val();
        console.log(producto_categoria);
    });


    $('#inputFileToLoad').on('change', function () {
        encodeImageFileAsURL();
    });



    ////////////////////////////
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
    ////////////////////////////

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
                //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);

                //console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    $("#btn-agregar-producto").click(function () {

        producto_nombre = $("#nombre-producto").val();
        producto_descripcion = $("#descripcion-producto").val();
        producto_precio = $("#precio-producto").val();
        producto_stock = $("#stock-producto").val();
        producto_locacion_alias = $("#comercio-alias").val();
        producto_imagen = srcData;

        //
        if (producto_categoria == undefined) {
            producto_categoria = "sin categoria";
        }
        if ((producto_locacion_logitud == undefined) || (producto_locacion_latitud) == undefined) {
            producto_locacion_logitud = 0;
            producto_locacion_latitud = 0;
            producto_locacion_alias = "sin nombre";
        }

        producto_id_vendedor = "nova77v@gmail.com";

        agregoProductos(producto_id_vendedor, producto_nombre, producto_categoria, producto_descripcion, producto_precio, producto_stock, producto_locacion_logitud, producto_locacion_latitud, producto_locacion_alias, producto_imagen);

    });


});







function agregoProductos(producto_id_vendedor, producto_nombre, producto_categoria, producto_descripcion, producto_precio, producto_stock, producto_locacion_logitud, producto_locacion_latitud, producto_locacion_alias, producto_imagen) {

    $.ajax({
        url: AGREGO_PRODUCTOS,
        type: "post",
        data: { producto_id_vendedor: producto_id_vendedor, producto_nombre: producto_nombre, producto_categoria: producto_categoria, producto_descripcion: producto_descripcion, producto_precio: producto_precio, producto_stock: producto_stock, producto_locacion_logitud: producto_locacion_logitud, producto_locacion_latitud: producto_locacion_latitud, producto_locacion_alias: producto_locacion_alias, producto_imagen: producto_imagen },
        success: function (data) {

            console.log(data);
        }

    });

};
