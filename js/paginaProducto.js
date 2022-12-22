var producto = new Producto;

var listaProductosCarrito = [];
var misparams = window.location.search;
var producto_id = misparams.split("=",-1)[1];
localStorage.setItem('ID_PRODUCT_SELECCIONADO', producto_id);


$(document).ready(function () {

    cargoProducto();
    dibujoInformacionProducto();

    $('#btn-agregar-carrito').click(function () {



        if (localStorage.getItem('ID_VENDEDOR_PRODUCTO_AGREGADO_AL_CARRITO') == null) {
            localStorage.setItem('ID_VENDEDOR_PRODUCTO_AGREGADO_AL_CARRITO', $('#vendedor-id').text());

            producto.producto_catidad_agregados_compra = $("#cantidad-unidades").val();
            localStorage.setItem('CARRITO', "[" + JSON.stringify(producto) + "]");

            


        } else {
            if (localStorage.getItem('ID_VENDEDOR_PRODUCTO_AGREGADO_AL_CARRITO') != $('#vendedor-id').text()) {

                if (confirm("esta agregando un producto de otro vendedor, se descartará el carrito")) {

                    localStorage.removeItem('ID_VENDEDOR_PRODUCTO_AGREGADO_AL_CARRITO');
                    localStorage.setItem('ID_VENDEDOR_PRODUCTO_AGREGADO_AL_CARRITO', $('#vendedor-id').text());

                } else {

                }

            } else {


                listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));
                //
                producto.producto_catidad_agregados_compra = $("#cantidad-unidades").val();
                //
                listaProductosCarrito.push(producto);
                localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));

                for (var i = 0; i < JSON.parse(localStorage.getItem('CARRITO')).length; i++) {
                   // alert(JSON.parse(localStorage.getItem('CARRITO'))[i]);
                }

                //console.log(JSON.parse(localStorage.getItem('CARRITO')));
                //localStorage.setItem('CARRITO', JSON.parse(localStorage.getItem('CARRITO')));
            }
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
                producto = new Producto(data[i].producto_id, data[i].producto_id_vendedor, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen, data[i].producto_estado);
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
        <p id="vendedor-id" style="display:none">`+ producto.producto_id_vendedor + `</p>
        <p id="produto-precio" style="display:none">`+ producto.producto_precio + `</p>
        <p id="produto-categoria" style="display:none">`+ producto.producto_categoria + `</p>

        `
    document.getElementById("contenedor-informacion-producto").innerHTML = htmlContentToAppend;

}
