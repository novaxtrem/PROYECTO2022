//
$(document).ready(function () {
    cargoNavbar();
    cargoFooter();
});


function cargoNavbar() {

    var htmlContentToAppend = "";

    htmlContentToAppend += `
        <nav class="navbar navbar-light navbar-expand-md py-3">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src="/PROYECTO2022/imagenes/logos-marcas/beerapp-logo-marca.svg" alt="logo beerapp store">
                </a>
                <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-3">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"></li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Cervezas</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Laguer</a>
                                <a class="dropdown-item" href="#">Bitter</a>
                                <a class="dropdown-item" href="#">IPA</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Insumos</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Grano</a>
                                <a class="dropdown-item" href="#">Quemadores</a>
                                <a class="dropdown-item" href="#">Termómetros</a>
                            </div>
                        </li>
                        <li class="nav-item"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contacto</a>
                        </li>
                    </ul>
                    <div class="dropdown" style="margin-right: 49px;">
                    <a class="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="color: rgb(33,33,33);">Mi Taberna</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Mis datos</a>
                        <a class="dropdown-item" href="#">Mis productos</a>
                        <a class="dropdown-item" href="#">Compras</a>
                        <a class="dropdown-item" href="#">Ventas</a>
                    </div>
                </div>
            </div>
        </nav>`
    document.getElementById("contenedor-navbar").innerHTML = htmlContentToAppend;

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
                                <a href="#">BeerApp</a>
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
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">Términos del servicio</a>
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