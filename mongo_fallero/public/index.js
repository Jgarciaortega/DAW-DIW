
function obtenerJSON() {

    let request = 'http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON';

    fetch(request)
        .then(response => response.json())
        .then(function (datos) {

            obtenerDatos(datos);

        });
}

function obtenerSecciones(datos) {

    seccionesPrincipales.push('Todas las secciones');
    seccionesInfantiles.push('Todas las secciones');

    datos.features.forEach(dato => {

        if (seccionesPrincipales.indexOf(dato.properties.seccion) == -1) {

            seccionesPrincipales.push(dato.properties.seccion);
        }

        if (seccionesInfantiles.indexOf(dato.properties.seccion_i) == -1) {

            seccionesInfantiles.push(dato.properties.seccion_i);
        }

    });

    //TO DO: ordenar datos antes de mostrar
    //seccionesInfantiles.sort();

    //Mostramos el dato con Seccion delante...
    for (let i = 0; i < seccionesPrincipales.length; i++) {

        if (seccionesPrincipales[i] != 'Todas las secciones')
            seccionesPrincipales[i] = 'Seccion :' + seccionesPrincipales[i];

    }

    for (let i = 0; i < seccionesInfantiles.length; i++) {

        if (seccionesInfantiles[i] != 'Todas las secciones')
            seccionesInfantiles[i] = 'Seccion :' + seccionesInfantiles[i];

    }

}

function mostrarFallas() {


    let filtroSeccion = document.querySelector('select').value;

    let seccionABuscar;
    let filtroAnyo;

    for (let i = 0; i < datosJSON.features.length; i++) {

        // console.log(filtroSeccion);
        // console.log(datosJSON.features[i].properties.seccion);

        if(seccionPpalActiva) seccionABuscar = datosJSON.features[i].properties.seccion.split(':');
        else seccionABuscar = datosJSON.features[i].properties.seccion_i.split(':');

        if (filtroSeccion == seccionABuscar || 
            filtroSeccion == 'Todas las secciones') {

            let falla = document.createElement('div');
            let img = document.createElement('img');
            img.setAttribute('src', datosJSON.features[i].properties.boceto);
            falla.appendChild(img);
            fichasFallas.appendChild(falla);
        }
    }

}

function cargarSelectSeccion() {

    //Si hay contenido previo lo eliminamos 
    limpiarNodo( document.querySelector('select'));

    let secciones = [];

    //Segun la seleccion se cargan las secciones principales o infantiles
    if (seccionPpalActiva) secciones = seccionesPrincipales;
    else secciones = seccionesInfantiles;

    let select = document.querySelector('select');;

    for (let i = 0; i < secciones.length; i++) {

        let option = document.createElement('option');

        option.innerHTML = secciones[i];
        select.appendChild(option);
    }
}

//Recibe un nodo padre a partir del cual eliminamos todo su contenido
function limpiarNodo(elemento) {

    if (elemento.hasChildNodes()) {

        while (elemento.childNodes.length >= 1) {
            elemento.removeChild(elemento.firstChild);
        }
    }

}

function cambiarSeccion() {

    if (seccionPpalActiva) seccionPpalActiva = false;
    else seccionPpalActiva = true;

    cargarSelectSeccion();
    mostrarFallas();
}

function modificarSeccionBuscada() {

    mostrarFallas();
}

function obtenerDatos(datos) {

    //Obtiene las diferentes secciones:
    obtenerSecciones(datos);
    //Cargamos el selector de secciones de fallas
    cargarSelectSeccion();
    //Guardamos los datos del JSON en una variable global
    datosJSON = datos;
    //Mostramos fallas
    mostrarFallas();
}

function init() {

    obtenerJSON();
    seccionPpalActiva = true;
    seccionesPrincipales = [];
    seccionesInfantiles = [];
    document.querySelector('input[value="principal"]').addEventListener('change', cambiarSeccion);
    document.querySelector('input[value="infantil"]').addEventListener('change', cambiarSeccion);
    document.querySelector('select').addEventListener('change', modificarSeccionBuscada);

}

//VARIABLES GLOBALES
let datosJSON;
let seccionPpalActiva;
let seccionesPrincipales;
let seccionesInfantiles;

window.addEventListener('load', init);