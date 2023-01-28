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
        data: {orden_compra_comprador_id: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var compra = new OrdenDeCompra(data[i].orden_compra_id, data[i].orden_compra_vendedor_id, data[i].orden_compra_comprador_id, data[i].orden_compra_numero_operacion_mercado_pago, data[i].orden_compra_direccion_envio, data[i].orden_compra_costo_envio,   data[i].orden_compra_total, data[i].orden_compra_estado);
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
            `<div class="compra"  id="compra-` + listaComprasDelUsuario[i].orden_compra_id + `">
                <div class="row justify-content-center align-items-center">

                    <div class="col-md-1 compra-id">
                      <p class="compra-id" style="color: rgb(253,157,13);">` + listaComprasDelUsuario[i].orden_compra_id + `</p>
                    </div>


                    <div class="col-md-3 compra-operacion">
                        <p class="compra-operacion"> ` + listaComprasDelUsuario[i].orden_compra_numero_operacion_mercado_pago + ` </p>
                    </div>

                    <div class="col-md-4 compra-envio" >
                       <p class="compra-envio"> `+ listaComprasDelUsuario[i].orden_compra_direccion_envio + `</p>
                    </div>

                    <div class="col-md-1 compra-total" >
                       <p class="compra-total">$`+ listaComprasDelUsuario[i].orden_compra_total + `</p>
                    </div>

                     <div class="col-md-2 compra-estado" >
                       <p class="compra-estado">`+ listaComprasDelUsuario[i].orden_compra_estado + `</p>
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-compras").innerHTML = htmlContentToAppend;
    }
}