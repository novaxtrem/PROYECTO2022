
function buscar_ahora(buscar) {
       if(arrayFiltros.length > 0)  var parametros = {"buscar":buscar , "filtros": arrayFiltros.toString()};
       else var parametros = {"buscar":buscar};
        $.ajax({
        data:parametros,
        type: 'POST',
        url: CONSULTO_BUSCADOR,
        success: function(data) {
        document.getElementById("datos_buscador").innerHTML = data;
        }
        });
        }
        buscar_ahora("");
       $('.producto-item').click(function () {
              localStorage.setItem('ID_PRODUCT_SELECCIONADO', $(this).find('.clean-product-item').attr('id'));
    });


function filtros (filtro) {
       var esteFiltro = "'"+filtro+"'";
       if (arrayFiltros.includes(esteFiltro)) arrayFiltros.splice(arrayFiltros.indexOf(esteFiltro), 1);
       else arrayFiltros.push(esteFiltro);
       localStorage.setItem('arrayFiltros', arrayFiltros);
       buscar_ahora($('#buscar').val());
}



