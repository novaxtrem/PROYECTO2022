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


    $('.disminuye-cantidad').click(function () {
        rutinaDisminuir(this);
    });


    $('.aumento-cantidad').click(function () {
        rutinaAumentar(this);
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

    calculoCarrito();

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


function eliminarProductoCarrito(e) {
    var productRow = $(e).parent().parent().parent();
    idProducto = $(productRow).children().children('.name-and-id').children('.id-producto').attr('id');
    //
    for (var i = 0; i < listaProductosCarrito.length; i++) {

        if (idProducto == listaProductosCarrito[i].producto_id) {
            listaProductosCarrito.splice(i);

            if (listaProductosCarrito.length == 0) {
                localStorage.setItem('CARRITO', '[]');
            } else {
                localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
            }
            location.reload();
        } else {
            location.reload();
        }
    }
}

function rutinaDisminuir(e) {

    var productRow = $(e).parent().parent().parent();
    idProducto = $(productRow).children().children('.name-and-id').children('.id-producto').attr('id');
    cantidadComprados = $(productRow).children().children('.control-cantidad').children('.cantidad-comprada').text();
    //

    if (cantidadComprados <= 1) {
        alert("la cantidad minima es 1 unidad");
        cantidadComprados = 1;
    } else {
        cantidadComprados = cantidadComprados - 1;
    }


    for (var i = 0; i < listaProductosCarrito.length; i++) {
        if (idProducto == listaProductosCarrito[i].producto_id) {

            listaProductosCarrito[i].producto_catidad_agregados_compra = cantidadComprados;

        } else {
            alert("error");
        }
    }

    localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
    location.reload();
}


function rutinaAumentar(e) {


    var productRow = $(e).parent().parent().parent();
    idProducto = $(productRow).children().children('.name-and-id').children('.id-producto').attr('id');
    cantidadComprados = $(productRow).children().children('.control-cantidad').children('.cantidad-comprada').text();
    //
    for (var i = 0; i < listaProductosCarrito.length; i++) {
        if (idProducto == listaProductosCarrito[i].producto_id) {
            if (cantidadComprados > listaProductosCarrito[i].producto_stock) {
                alert("no hay tantas unidades el maximo posible es de: " + listaProductosCarrito[i].producto_stock);
                cantidadComprados = listaProductosCarrito[i].producto_stock;
            } else {
                cantidadComprados++;
            }
            listaProductosCarrito[i].producto_catidad_agregados_compra = cantidadComprados;
        } else {
            alert("hubo un problema, intenteluego");
        }
    }
    localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
    location.reload();
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
                `<div class="row border-top border-bottom item">
                    <div class="row main align-items-center">
                        <div class="col-2">
                            <img class="img-fluid" src="`+ listaProductosCarrito[i].producto_imagen + `">
                        </div>
                        <div class="col name-and-id">
                            <div class="row text-muted">`+ listaProductosCarrito[i].producto_categoria + `</div>
                            <div class="id-producto" id="`+ listaProductosCarrito[i].producto_id + `">` + listaProductosCarrito[i].producto_nombre + `</div>
                        </div>
                        <div class="col control-cantidad">
                            <button class="disminuye-cantidad">-</a>
                            <button class="border cantidad-comprada">`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `</a>
                            <button class="aumento-cantidad">+</a>
                        </div>
                        <div class="col">`+ listaProductosCarrito[i].producto_precio + `$ <span class="close btn-borrar-producto-carrito">  borrar</span></div>
                    </div>
                 </div>
                `
            document.getElementById("contenedor-productos-carrito").innerHTML = htmlContentToAppend;
        }
    }
}

function calculoCarrito() {
    var total = 0;


    for (var i = 0; i < listaProductosCarrito.length; i++) {
        total = listaProductosCarrito[i].producto_precio * listaProductosCarrito[i].producto_catidad_agregados_compra;
    }


    $('#precio-total-importe').text(total);
}


function mostarAlerta() {
    $('.alert').show();

    setTimeout(function () {
        $('.alert').fadeOut('slow');
    }, 2300
    );
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