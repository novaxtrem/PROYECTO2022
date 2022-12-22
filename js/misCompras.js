var listaProductos = [];

$(document).ready(function () {

<<<<<<< Updated upstream
    cargoArrayCompras();
=======
<<<<<<< Updated upstream
    dibujoCarrito();

    /*
    $('#btn-agregar-carrito').click(function () {
        console.log($('#produto-id').text());
        localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') + ";" + $('#produto-id').text()));
    });

*/
=======
    cargoArrayCompras();
    dibujoMisCompras();   
>>>>>>> Stashed changes
>>>>>>> Stashed changes

});


function cargoArrayCompras() {

    return $.ajax({
        url: CONSULTO_COMPRAS_REALIZADAS,
        type: "POST",
<<<<<<< Updated upstream
        data: { comprador_email: "nova77v@gmail.com" },
=======
<<<<<<< Updated upstream
        data: { producto_id: localStorage.getItem('ID_PRODUCT_SELECCIONADO') },
=======
        data: {comprador_email: "stephyz.b@gmail.com"},
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
