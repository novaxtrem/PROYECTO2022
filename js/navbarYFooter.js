

$(document).ready(function () {

    cargoNavbar();
    cargoFooter();



});


function cargoNavbar() {

    var htmlContentToAppend = "";

    if (JSON.parse(localStorage.getItem('USUARIO_CONECTADO')) == null) {

        htmlContentToAppend += `
        <nav class="navbar navbar-light navbar-expand-md py-3">
            <div class="container">
                <a href="`+ PAGINA_INDEX + `">
                    <img src=`+ LOGO_BEERAPP + `alt="logo beerapp store" style="height: 45px">
                </a>
                <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-3">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="`+ PAGINA_INDEX + `">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="`+ PAGINA_EVENTOS + `">Eventos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="`+ PAGINA_QUIENES_SOMOS + `">Quienes somos</a>
                                <a class="dropdown-item" href="`+ PAGINA_FAQ + `">FAQ</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <button type="button" class="btn btn-warning btn-detalle login-btn" > 
                    <a class="nav-link"  href="`+ PAGINA_ALTA_USUARIO + `"> registrate</a> / 
                    <a class="nav-link"  href="`+ PAGINA_INGRESO + `">inicia sesión</a>
                </button>
            </div>
        </nav>`
        document.getElementById("contenedor-navbar").innerHTML = htmlContentToAppend;

    } else {
        htmlContentToAppend += `
        <nav class="navbar navbar-light navbar-expand-md py-3">
            <div class="container">
                <a href="`+ PAGINA_INDEX + `">
                    <img src=`+ LOGO_BEERAPP + ` alt="logo beerapp store" style="height: 45px">
                </a>
                <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-3">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="`+ PAGINA_INDEX + `">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="`+ PAGINA_INDEX + `">Eventos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <div class="dropdown-menu">
                                <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Sobre Nosotros</a>
                                <a class="dropdown-item" href="`+ PAGINA_QUIENES_SOMOS + `">Quienes somos</a>
                                <a class="dropdown-item" href="`+ PAGINA_FAQ + `">FAQ</a>
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown" style="margin-right: 49px;">
                    <a class="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="color: rgb(33,33,33);"> Mi Taberna</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="`+ PAGINA_CARRITO + `">Carrito</a>
                        <a class="dropdown-item" href="`+ PAGINA_MIS_DATOS + `">Mis datos</a>
                        <a class="dropdown-item" href="`+ PAGINA_MIS_PRODUCTOS + `">Mis productos</a>
                        <a class="dropdown-item" href="`+ PAGINA_MIS_COMPRAS + `">Mis Compras</a>
                        <a class="dropdown-item" href="`+ PAGINA_MIS_VENTAS + `">Mis Ventas</a>
                        <a class="dropdown-item" id="cerrar-sesion" href=`+ PAGINA_INDEX + `>Cerrar sesion</a>
                    </div>
                </div>
            </div>
        </nav>`
        document.getElementById("contenedor-navbar").innerHTML = htmlContentToAppend;

        $('#cerrar-sesion').click(function () {
            localStorage.clear();
            window.location.href = PAGINA_INDEX;
        });
    }

}

function cargoFooter() {

    var htmlContentToAppend = "";

    htmlContentToAppend += `
        <footer class="page-footer dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-3">
                        <h5>Sobre Nosotros</h5>
                        <ul>
                            <li>
                                <a href="`+ PAGINA_INDEX + `">BeerApp</a>
                            </li>
                            <li>
                                <a href="#">Contactanos</a>
                            </li>
                            <li>
                                <a href="#">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5>Legal</h5>
                        <ul>
                            <li>
                                <a href="`+ PAGINA_FAQ + `">FAQ</a>
                            </li>
                            <li>
                                <a href="`+ PAGINA_TERMINOS_DE_USO + `">Términos de uso</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>Desarrollado por GESTEMA&nbsp;<span style="font-weight: normal !important; font-style: normal !important;">©2022&nbsp;</span>
                    <br>
                </p>
            </div>
        </footer>`
    document.getElementById("footer-contenedor").innerHTML = htmlContentToAppend;

}