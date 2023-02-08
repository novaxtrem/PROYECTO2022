var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaComprasDelUsuario = [];

$(document).ready(function () {

    cargoArrayCompras();
    dibujoComprasDelUsuario();

});


function cargoArrayCompras() {

    return $.ajax({
        url: CONSULTO_COMPRAS_REALIZADAS,
        type: "POST",
        data: { orden_compra_comprador_id: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var compra = new OrdenDeCompra(data[i].orden_compra_id, data[i].orden_compra_vendedor_id, data[i].orden_compra_comprador_id, data[i].orden_compra_numero_operacion, data[i].orden_compra_direccion_envio, data[i].orden_compra_costo_envio,   data[i].orden_compra_total, data[i].orden_compra_estado, data[i].producto_imagen, data[i].producto_nombre, data[i].detalle_orden_compra_cantidad_productos_comprados  );
                listaComprasDelUsuario.push(compra);
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};

function dibujoComprasDelUsuario() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaComprasDelUsuario.length; i++) {

        htmlContentToAppend +=
            `<div class="compra product">
                <div class="row justify-content-center align-items-center">
                       
                       <div class="col-md-3">
                        <div class="product-image">
                            <img style="max-width: 30%;" class="img-fluid d-block mx-auto image" src="`+ listaComprasDelUsuario[i].producto_imagen + `">
                        </div></div>

                    <div class="col-md-2 compra-producto product-info">
                    <p class="compra-nombre product-name titulo" style="color: rgb(253,157,13);"> ` + listaComprasDelUsuario[i].producto_nombre + `</p>
                    <p class="compra-cantidad" style="color: rgb(253,157,13);">Cantidad: ` + listaComprasDelUsuario[i].detalle_orden_compra_cantidad_productos_comprados + `</p>

                    </div>


                    <div class="col-md-2 compra-operacion text-center" >
                        <p class="compra-operacion"> ` + listaComprasDelUsuario[i].orden_compra_numero_operacion + ` </p>
                    </div>

                    <div class="col-md-2 compra-envio text-center" >
                       <p class="compra-envio"> `+ listaComprasDelUsuario[i].orden_compra_direccion_envio + `</p>
                    </div>

                    <div class="col-md-1 compra-total text-center" >
                       <p class="compra-total">$`+ listaComprasDelUsuario[i].orden_compra_total + `</p>
                    </div>

                     <div class="col-md-2 compra-estado text-center" >
                       <p class="compra-estado">`+ listaComprasDelUsuario[i].orden_compra_estado + `</p>
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-compras").innerHTML = htmlContentToAppend;
    }
}