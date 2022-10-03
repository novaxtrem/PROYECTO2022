var listaProductos = [];
//var listaControladoras = [];


$(document).ready(function () {



    $("#btn-agregar-producto").click(function () {
        producto_id = $("#id-producto").val();
        producto_nombre = $("#nombre-producto").val();
        producto_descripcion = $("#descripcion-producto").val();
        producto_stock = $("#stock-producto").val();
        producto_precio = $("#precio-producto").val();
        producto_categoria_id = 1;//$("#fname").val();



        agregoProductos(producto_id, producto_nombre, producto_descripcion, producto_stock, producto_precio, producto_categoria_id);
    });



    //cargoArrayInvernaderos();
    //dibujoTablaInvernaderos();

});




function agregoProductos(producto_id, producto_nombre, producto_descripcion, producto_stock, producto_precio, producto_categoria_id) {
    $.ajax({
        url: AGREGO_PRODUCTOS,
        type: "post",
        data: { producto_id: producto_id, producto_nombre: producto_nombre, producto_descripcion: producto_descripcion, producto_stock: producto_stock, producto_precio: producto_precio, producto_categoria_id: producto_categoria_id },
        success: function (data) {
            console.log(data);
        }
    });

};

/*


function cargoArrayInvernaderos() {
    return $.ajax({
        url: CONSULTO_INVERNADEROS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var invernadero = new Invernadero(data[i].id, data[i].nombre);
                listaInvernaderos.push(invernadero);
            }
        }
    });
};


function dibujoTablaInvernaderos() {
    var htmlContentToAppend = "";
    for (var i = 0; i < listaInvernaderos.length; i++) {
        htmlContentToAppend += `
                <tr>
                    <td name="id-invernadero" data-label="id">` + listaInvernaderos[i].id + `</td>
                    <td name="nombre" data-label="nombre">` + listaInvernaderos[i].nombre + `</td>
                    <td data-label="configuracion"> 
                        <button class="ui basic button btn-configuracion"><i class="sliders horizontal"></i>
                            Configurar
                        </button>
                    </td>
                </tr>`
        document.getElementById("tabla-invernaderos-tbody-container").innerHTML = htmlContentToAppend;
    }
}

*/