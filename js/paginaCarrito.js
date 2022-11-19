listaProductosCarrito = [];

$(document).ready(function () {

    //  cargoProducto();
    dibujoCarrito();


    /*
    $('#btn-agregar-carrito').click(function () {
        console.log($('#produto-id').text());
        localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') + ";" + $('#produto-id').text()));
    });

*/

});

/*
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
                
                console.log(producto);
            }
        }
    });
};
*/




function dibujoCarrito() {


    listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));
    var htmlContentToAppend = "";

    for (var i = 0; i < listaProductosCarrito.length; i++) {
        console.log(listaProductosCarrito[i]);

        htmlContentToAppend +=
            `<div class="product">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-3">
                    <div class="product-image">
                        <img class="img-fluid d-block mx-auto image" src="/PROYECTO2022/imagenes/productos/sin-imagen.png">
                    </div>
                </div>
                <div class="col-md-5 product-info">
                    <a class="product-name" href="#" style="color: rgb(253,157,13);">`+ listaProductosCarrito[i].producto_nombre + `</a>
                    <button class="btn btn-primary"style="background-color: rgb(253,157,13);">eliminar</button>
                </div>
                <div class="col-6 col-md-2 quantity">
                    <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                    <input type="number" id="catidad-productos-comprados" class="form-control quantity-input" value="`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `">
                </div>
                <div class="col-6 col-md-2 price">
                    <label class="form-label d-none d-md-block" for="precio-unitario">precio</label>
                    <span id="precio">$`+ listaProductosCarrito[i].producto_precio + `</span>
                </div>
            </div>
        </div>`
        document.getElementById("contenedor-productos-en-el-carrito").innerHTML = htmlContentToAppend;
    }
}
