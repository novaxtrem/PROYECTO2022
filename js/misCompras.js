var listaProductos = [];

$(document).ready(function () {

    cargoArrayCompras();
    dibujoMisCompras();   

});


function cargoArrayCompras() {

    return $.ajax({
        url: CONSULTO_COMPRAS_REALIZADAS,
        type: "POST",
        data: {comprador_email: "stephyz.b@gmail.com"},
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                console.log(data);
            }
        },
        error: function (data) {
            alert(data);

        },
    });
};
