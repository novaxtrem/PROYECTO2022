var listaProductos = [];
//
$(document).ready(function () {
    cargoArrayProductos();
    dibujoTablaProductos();
    //////////////////////////////
    $('.btn-editar-producto').click(function () {
        editarProducto(this);
    });

});

function cargoArrayProductos() {
    return $.ajax({
        url: CONSULTO_PRODUCTOS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var producto = new Producto(data[i].producto_id, data[i].producto_nombre);
                listaProductos.push(producto);
            }
        }
    });
};
function dibujoTablaProductos() {
    var htmlContentToAppend = "";
    for (var i = 0; i < listaProductos.length; i++) {
        htmlContentToAppend += `
                <tr>
                    <td name="id-producto" data-label="id">` + listaProductos[i].producto_id + `</td>
                    <td name="nombre-producto" data-label="nombre">` + listaProductos[i].producto_nombre + `</td>
                    <td data-label="editar"> 
                        <button class="btn-editar-producto"><i></i>
                            Editar
                        </button>
                    </td>
                </tr>`
        document.getElementById("tabla-de-productos-tbody-container").innerHTML = htmlContentToAppend;
    }
}

function editarProducto(btnEditar) {
    var productoRow = $(btnEditar).parent().parent();
    var id_producto = parseInt(productoRow.children('td[name="id-producto"]').text());
    var nombreProducto = productoRow.children('td[name="nombre-producto"]').text();
    //////////////////////////////
    alert("npmbre del producto " + nombreProducto + " id del producto " + id_producto);

}
