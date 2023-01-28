var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaVentasDelUsuario = [];
var productRow;

$(document).ready(function () {

    cargoArrayVentas();
    dibujoVentasDelUsuario();

    $(".compra-estado").prop("readonly", true);
    $(".btn-confirmar-edicion").attr("disabled", true);
    //

    $('.btn-confirmar-edicion').click(function () {

        actualizoVentas();
        location.reload();
    });


    $('.btn-editar-producto').click(function () {

        productRow = $(this).parent().parent().parent();


        if ($(this).text() == "editar") {

            $(".compra-estado").prop("readonly", false);
            $(".btn-confirmar-edicion").attr("disabled", false);


            //
            $(this).text("cancelar");
            $(productRow).find('.compra-estado').css({ "border-width": "1px" });
            $(this).css({ "background-color": "rgb(204, 0, 0)" });
        } else {
            $(this).text("editar");
            $(productRow).find('.compra-estado').css({ "border-width": "0px" });
            $(this).css({ "background-color": "rgb(253,157,13)" });
            //
            $(".compra-estado").prop("readonly", true);
            $(".btn-confirmar-edicion").attr("disabled", true);

        }

    });




});


function cargoArrayVentas() {

    return $.ajax({
        url: CONSULTO_MIS_VENTAS,
        type: "POST",
        data: {orden_compra_vendedor_id: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var compra = new OrdenDeCompra(data[i].orden_compra_id, data[i].orden_compra_vendedor_id, data[i].orden_compra_comprador_id, data[i].orden_compra_numero_operacion_mercado_pago, data[i].orden_compra_direccion_envio, data[i].orden_compra_costo_envio,   data[i].orden_compra_total, data[i].orden_compra_estado);
                listaVentasDelUsuario.push(compra);
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};

function dibujoVentasDelUsuario() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaVentasDelUsuario.length; i++) {

        htmlContentToAppend +=
            `<div class="compra"  id="compra-` + listaVentasDelUsuario[i].orden_compra_id + `">
                <div class="row justify-content-center align-items-center">

                    <div class="col-md-1 compra-id">
                      <p class="compra-id" style="color: rgb(253,157,13);">` + listaVentasDelUsuario[i].orden_compra_id + `</p>
                    </div>


                    <div class="col-md-3 compra-operacion">
                        <p class="compra-operacion"> ` + listaVentasDelUsuario[i].orden_compra_numero_operacion_mercado_pago + ` </p>
                    </div>

                    <div class="col-md-2 compra-envio" >
                       <p class="compra-envio"> `+ listaVentasDelUsuario[i].orden_compra_direccion_envio + `</p>
                    </div>

                    <div class="col-md-1 compra-total" >
                       <p class="compra-total">$`+ listaVentasDelUsuario[i].orden_compra_total + `</p>
                    </div>

                     <div class="col-md-2 compra-estado" >
                       <input class="compra-estado" type="text" style="color: rgb(253,157,13); border-width:0px; " value="`+ listaVentasDelUsuario[i].orden_compra_estado + `">
                       
                    </div>
                    <div class="col-md-3 compra-estado" >
                       
                       <button class="btn btn-primary btn-editar-producto"style="background-color: rgb(253,157,13);">editar</button>
                        <button class="btn btn-primary btn-confirmar-edicion"style="background-color:   rgb(0, 153, 204);">confirmar</button>
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-ventas").innerHTML = htmlContentToAppend;
    }
}


function actualizoVentas() {

    var compraID = $(productRow).prop('id');
    var estadoCompra = $(productRow).find('.compra-estado').val();
    //
    return $.ajax({
        url: ACTUALIZO_VENTAS,
        type: "POST",
         data: {orden_compra_id: compraID, orden_compra_estado: estadoCompra },
        dataType: 'json',
        async: false,
        success: function (data) {

            console.log(data);
        },
        error: function (data) {
            console.log(data);
        },

    });


};