listaProductosCarrito = [];
//
var tipodeEnvio = "retira";
var medioPago = "transferencia";

usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));

$(document).ready(function () {

    dibujoCarrito();


    $('.boton-eliminar').click(function () {
        eliminarProductoCarrito(this);
    });


    $('.btn-borrar-producto-carrito').click(function () {
        eliminarProductoCarrito(this);
    });


    if (listaProductosCarrito == null || listaProductosCarrito <= 0) {
        $('btn-ingresar-orden').attr("disabled", true);
    } else {
        $('btn-ingresar-orden').attr("disabled", false);
    }


    $('#select-tipo-envio').on('change', function () {
        tipodeEnvio = $(this).find(":selected").val();
        if (tipodeEnvio == 'envio a domicilio') {
            tipodeEnvio = usuarioConectado.usuario_direccion;
        }
    });

    $('#select-medio-pago').on('change', function () {
        medioPago = $(this).find(":selected").val();

    });

    $('#btn-ingresar-orden').click(function () {
        agregoOrdenCompra();
    });

});






function dibujoCarrito() {


    var htmlContentToAppend = "";



    if (listaProductosCarrito == null || listaProductosCarrito <= 0) {
        htmlContentToAppend =
            `<div>
                <h1 style="color:#f29c40;text-align:center;padding-top:15px">no hay productos en el carrito</h1>
            </div>`
        document.getElementById("contenedor-productos-carrito").innerHTML = htmlContentToAppend;

    } else {

        for (var i = 0; i < listaProductosCarrito.length; i++) {
            htmlContentToAppend +=
                `<div class="row border-top border-bottom">
                    <div class="row main align-items-center">
                        <div class="col-2"><img class="img-fluid" src="`+ listaProductosCarrito[i].producto_imagen + `"></div>
                        <div class="col">
                            <div class="row text-muted">`+ listaProductosCarrito[i].producto_categoria + `</div>
                            <div class="row" id="`+ listaProductosCarrito[i].producto_id + `">` + listaProductosCarrito[i].producto_nombre + `</div>
                        </div>
                        <div class="col">
                            <a href="#">-</a><a href="#" class="border">`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `</a><a href="#">+</a>
                        </div>
                        <div class="col">`+ listaProductosCarrito[i].producto_precio + `$ <span class="close btn-borrar-producto-carrito"> borrar</span></div>
                    </div>
                 </div>
                `
            document.getElementById("contenedor-productos-carrito").innerHTML = htmlContentToAppend;
        }
    }



}


function eliminarProductoCarrito(e) {

    var productRow = $(e).parent().parent().parent();
    productRow.remove();
    //
    /*
    idProducto = $(productRow).children().children('.product-info').children('.id-producto').text();

    alert(idProducto);

    for (var i = 0; i < listaProductosCarrito.length; i++) {
        if (listaProductosCarrito[i].producto_id == idProducto) {
            listaProductosCarrito.splice(i, 12);
            localStorage.setItem('CARRITO', "[" + JSON.stringify(listaProductosCarrito) + "]");
            location.reload();
        }
    }

*/



}



function agregoOrdenCompra() {

    orden_compra_numero_operacion = $('#numero-de-operacion').val();

    
    //
    $.ajax({
        url: ALTA_ORDEN_COMPRA,
        type: "post",
        data: { orden_compra_vendedor_id: listaProductosCarrito[0].producto_id_vendedor, orden_compra_comprador_id: usuarioConectado.usuario_email, orden_compra_numero_operacion: orden_compra_numero_operacion, orden_compra_direccion_envio: tipodeEnvio, orden_compra_total: '10', productos_comprados: JSON.stringify(listaProductosCarrito) },
        success: function (data) {
            console.log(data);
        }
    });

}