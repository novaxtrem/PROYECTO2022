listaProductosCarrito = [];
var datosDelVendedor = [];
//
var tipodeEnvio = "retira";
var medioPago = "transferencia";
//
usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));

$(document).ready(function () {

    dibujoCarrito();

    if (listaProductosCarrito.length > 0) {
        cosultoDatosVendedor();
    }

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
        //
        medioPago = $(this).find(":selected").val();
        //
        if (medioPago == 'Transferencia') {
            //
            $('#modal-de-pago-transferencia').modal('show');
            //
        } else if (medioPago == 'QR Mercado Pago') {
            //
            $('#modal-de-pago-QR').modal('show');
            //
        } else {
            alert("debe selecciona un metodo de pago");
        }
    });

    //
    $('#btn-ingresar-orden').click(function () {
        agregoOrdenCompra();
    });

});

function dibujoModal(datosDelVendedor) {

    htmlContentToAppend =
        `
            <div class="modal fade" id="modal-de-pago-transferencia" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Pago con transferencia</h5>
                        </div>
                        <div class="modal-body">
                            <h4> Numero de cuenta : `+ datosDelVendedor.usuario_cuenta_bancaria + `</h4>
                        </div>
                    </div>
                </div>
            </div>
            <!--/////////////////////////////////////////-->
            <div class="modal fade" id="modal-de-pago-QR" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Pago con QR</h5>
                        </div>
                        <div class="modal-body">
                            <img src=`+ datosDelVendedor.usuario_QR_mercado_libre + `>
                        </div>
                    </div>
                </div>
            </div>
        `   
        
    document.getElementById("contenedor-modal-de-pago").innerHTML = htmlContentToAppend;
}

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


function mostarAlerta() {
    $('.alert').show();

    setTimeout(function () {
        $('.alert').fadeOut('slow');
    }, 2300
    );
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

function cosultoDatosVendedor() {

    $.ajax({
        url: CONSULTO_DATOS_VENDEDOR,
        type: "post",
        data: { usuario_email: listaProductosCarrito[0].producto_id_vendedor },
        success: function (data) {
            datosDelVendedor = JSON.parse(data);
            dibujoModal(datosDelVendedor);
        }
    });
}

function agregoOrdenCompra() {

    orden_compra_numero_operacion = $('#numero-de-operacion').val();
    //
    $.ajax({
        url: ALTA_ORDEN_COMPRA,
        type: "post",
        data: { orden_compra_vendedor_id: listaProductosCarrito[0].producto_id_vendedor, orden_compra_comprador_id: usuarioConectado.usuario_email, orden_compra_numero_operacion: orden_compra_numero_operacion, orden_compra_direccion_envio: tipodeEnvio, orden_compra_total: listaProductosCarrito[0].producto_precio, productos_comprados: JSON.stringify(listaProductosCarrito) },
        success: function (data) {
            console.log(data);
            mostarAlerta();
            localStorage.removeItem('CARRITO');
            setTimeout(function () {
   window.location.href = PAGINA_MIS_COMPRAS; 
}, 2000); 
          
        }
    });

}