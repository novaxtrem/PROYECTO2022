listaProductosCarrito = [];
listaFinalProductosComprados = [];

var orden_compra_id, orden_compra_vendedor_id, orden_compra_comprador_id, orden_compra_numero_operacion_mercado_pago, orden_compra_direccion_envio, orden_compra_costo_envio, orden_compra_total, orden_compra_estado;

$(document).ready(function () {

    dibujoCarrito();
    calculoCostoCarrito();

    $('#btn-pagar').click(function () {
        agregoOrdenCompra();
    });


    $(".catidad-productos-agregados").change(function () {
        calculoCostoCarrito();
    });


    $('.boton-eliminar').click(function () {
        eliminarProducto(this);
    });

});

function eliminarProducto(e) {
    var productRow = $(e).parent().parent().parent();
    //
    productRow.remove();
    calculoCostoCarrito();
}

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

function calculoCostoCarrito() {
    var subTotalCostoProductos = 0;
    listaFinalProductosComprados = [];

    $('.producto').each(function () {

        var precioUnitario = 0;
        var cantidad = 0;
        var costoProducto = 0;
        var idProducto = 0;
        //
        idProducto = $(this).children().children('.product-info').children('.id-producto').text();
        //
        precioUnitario = parseFloat($(this).children().children('.contenedor-precio-producto').children('.precio-unitario').text().replace('$', ''));
        cantidad = parseInt($(this).children().children('.cantidad-productos').children('.catidad-productos-agregados').val());
        //
        costoProducto = precioUnitario * cantidad;
        //
        subTotalCostoProductos += costoProducto;


        var detalleProductoComprado = {

            detalle_orden_producto_id: idProducto,
            detalle_orden_compra_costo_unitario_producto: precioUnitario,
            detalle_orden_compra_cantidad_productos_comprados: cantidad,

        };

        listaFinalProductosComprados.push(detalleProductoComprado);

    });

    $('#subtotal').text("$ " + subTotalCostoProductos);
    $('#costo-envio').text("$ " + 200);
    $('#precio-final').text("$ " + (200 + subTotalCostoProductos));

}




function dibujoCarrito() {

    listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));
    var htmlContentToAppend = "";



    if (listaProductosCarrito == null) {
        htmlContentToAppend =
            `<div>
                    <h1 style="color:#f29c40;text-align:center;padding-top:15px">no hay productos en el carrito</h1>
                </div>`
        document.getElementById("contenedor-principal").innerHTML = htmlContentToAppend;

    } else {

        for (var i = 0; i < listaProductosCarrito.length; i++) {
            htmlContentToAppend +=
                `<div class="producto">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-3">
                            <div class="product-image">
                                <img class="img-fluid d-block mx-auto image imagen-producto" src="`+ listaProductosCarrito[i].producto_imagen + `">
                            </div>
                        </div>
                        <div class="col-md-5 product-info">
                            <a class="nombre-producto" style="color: rgb(253,157,13);">` + listaProductosCarrito[i].producto_nombre + `</a>
                            <p class="id-producto" style="display:none">`+ listaProductosCarrito[i].producto_id + `</p>
                            <button class="btn btn-primary boton-eliminar"style="background-color: rgb(253,157,13);">eliminar</button>
                        </div>
                        <div class="col-6 col-md-2 cantidad-productos">
                            <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                            <input type="number" class="form-control quantity-input catidad-productos-agregados" value="`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `">
                        </div>
                        <div class="col-6 col-md-2 contenedor-precio-producto">
                            <label class="form-label d-none d-md-block" for="precio-unitario">precio</label>
                            <span class="precio-unitario">$ `+ listaProductosCarrito[i].producto_precio + `</span>
                        </div>
                    </div>
                </div>`
            document.getElementById("contenedor-productos-en-el-carrito").innerHTML = htmlContentToAppend;
        }
    }
}

function agregoOrdenCompra() {
    $.ajax({
        url: ALTA_ORDEN_COMPRA,
        type: "post",
        data: { orden_compra_id: orden_compra_id, orden_compra_vendedor_id: orden_compra_vendedor_id, orden_compra_comprador_id: orden_compra_comprador_id, orden_compra_numero_operacion_mercado_pago: orden_compra_numero_operacion_mercado_pago, orden_compra_direccion_envio: orden_compra_direccion_envio, orden_compra_costo_envio: orden_compra_costo_envio, orden_compra_total: orden_compra_total, orden_compra_estado: orden_compra_estado, productos_comprados: JSON.stringify(listaFinalProductosComprados) },
        success: function (data) {
            console.log(data);
        }
    });

}