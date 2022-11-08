var producto = new Producto;



$(document).ready(function () {

    cargoProducto();
    dibujoInformacionProducto();

    $('#btn-agregar-carrito').click(function () {


        if (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') == null) {
            localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', $('#produto-id').text() + ";");
        } else {
            localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') + ";" + $('#produto-id').text()));
        }









    });

    if (producto.producto_locacion_alias !== "sin nombre") {
        var marker = L.marker();
        var map = L.map('map').setView([producto.producto_locacion_latitud, producto.producto_locacion_logitud], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        marker = L.marker([producto.producto_locacion_latitud, producto.producto_locacion_logitud]).addTo(map);
        ////
        var htmlContentToAppend = "";
        ////
        htmlContentToAppend +=
            `<p>` + producto.producto_locacion_alias + `</p>`;
        document.getElementById("locacion-alias-container").innerHTML = htmlContentToAppend;
    }


});

function cargoProducto() {

    return $.ajax({
        url: CONSULTO_PRODUCTO,
        type: "POST",
        data: { producto_id: localStorage.getItem('ID_PRODUCT_SELECCIONADO') },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                producto = new Producto(data[i].producto_id, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen);
            }
        }
    });
};

function dibujoInformacionProducto() {

    if (producto.producto_imagen == "0") {
        producto.producto_imagen = SIN_IMAGEN;
    }

    var htmlContentToAppend = "";
    htmlContentToAppend +=
        `<div class="row">
            <div class="col-md-6">
                <div style="margin: 53px;">
                    <img src="`+ producto.producto_imagen + `" style="width: 300px;">
                </div>
            </div>
            <div class="col-md-6">
                <div class="info">
                    <h3>`+ producto.producto_nombre + `</h3>
                    <div class="summary">
                        <p>`+ producto.producto_descripcion + `</p>
                    </div>
                    <div class="price">
                        <h3>`+ producto.producto_precio + ` $U</h3>
                    </div>
                    <div class="col-6 col-md-2 quantity" style="margin-bottom: 10px;">
                        <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                        <input type="number" id="cantidad-unidades" class="form-control quantity-input" value="1">
                    </div>
                    <button class="btn btn-primary" id="btn-agregar-carrito" type="button" style="background: rgb(253,157,13);">
                        <i class="icon-basket"></i>Agregar al carrito
                    </button>
                    <div id="map" style="height:200px;width: 200px;"></div>
                    <div id="locacion-alias-container"></div>
                </div>
            </div>
        </div>
        <p id="produto-id" style="display:none">`+ producto.producto_id + `</p>
        <p id="produto-precio" style="display:none">`+ producto.producto_precio + `</p>
        <p id="produto-vendedor" style="display:none">`+ producto.producto_categoria + `</p>

        `
    document.getElementById("contenedor-informacion-producto").innerHTML = htmlContentToAppend;

}
