$(document).ready(function () {

    cargoArrayCompras();

});


function cargoArrayCompras() {

    return $.ajax({
        url: CONSULTO_COMPRAS_REALIZADAS,
        type: "POST",
        data: { comprador_email: "nova77v@gmail.com" },
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
