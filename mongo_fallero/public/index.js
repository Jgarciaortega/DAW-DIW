
function obtenerJSON() {

    let request = 'http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON';

    fetch(request)
        .then(response => response.json())
        .then(function (datos) {

            obtenerDatos(datos);

        });
}

function obtenerSecciones(datos) {

    datos.features.forEach(dato => {

        if (seccionesPrincipales.indexOf(dato.properties.seccion) == -1) {

            seccionesPrincipales.push(dato.properties.seccion);
        }

        if (seccionesInfantiles.indexOf(dato.properties.seccion_i) == -1) {

            seccionesInfantiles.push(dato.properties.seccion_i);
        }

    });

    //Ordenar datos antes de mostrar
    ordenarSecciones();

}

function ordenarSecciones() {

    //Secciones principales ordenadas con .sort
    seccionesPrincipales.sort();
    //TO-DO:Ordenamiento .sort en secciones infantiles no funciona correctamente 
    seccionesInfantiles.sort();

    //Mostramos el dato con Seccion delante...
    anyadirTexto(seccionesPrincipales);
    anyadirTexto(seccionesInfantiles);

}

function anyadirTexto(seccion) {

    for (let i = 0; i < seccion.length; i++) {

        if (seccion[i] == 'E') seccion[i] = 'Seccion Especial';
        else if (seccion[i] == 'FC') seccion[i] = 'Fuera de categoria';
        else seccion[i] = 'Seccion :' + seccion[i];

    }

    seccion.push('Todas las secciones');
}

function mostrarFallas() {


    let filtroSeccion = document.querySelector('select').value;
    let contFichasFallas = document.getElementById('fichasFallas');
    let anyoValido = false;

    /*Ya que el formato filtroSeleccion se ha modificado para que sea mas legible he de adaptarlo para coincidir 
    con la busqueda en el JSON */
    filtroSeccion = adaptarFiltroSeccion(filtroSeccion);

    //Datos por los que se va a filtrar la busqueda:
    let seccionABuscar;
    let imgABuscar;
    let anyoFundacion;
    let ubicacionFalla;

    // console.log(datosJSON);

    limpiarNodo(contFichasFallas);

    for (let i = 0; i < datosJSON.features.length; i++) {

        if (seccionPpalActiva) {

            seccionABuscar = datosJSON.features[i].properties.seccion;
            imgABuscar = datosJSON.features[i].properties.boceto;
            anyoFundacion = datosJSON.features[i].properties.anyo_fundacion;

        }
        else {

            seccionABuscar = datosJSON.features[i].properties.seccion_i;
            imgABuscar = datosJSON.features[i].properties.boceto_i;
            anyoFundacion = datosJSON.features[i].properties.anyo_fundacion_i;
        }

        ubicacionFalla = datosJSON.features[i].geometry.coordinates;
        anyoValido = validarAnyo(parseInt(anyoFundacion));

        if (anyoValido && filtroSeccion == seccionABuscar || filtroSeccion == 'Todas las secciones') {

            console.log(anyoFundacion);
            //Contenedor principal con toda la info de la falla
            let falla = document.createElement('div');
            falla.classList.add('contenedorFalla');
            fichasFallas.appendChild(falla);

            //Contenedor del titulo-nombre falla
            let divNombreFalla = document.createElement('div');
            divNombreFalla.classList.add('nombreFalla');
            divNombreFalla.innerHTML = datosJSON.features[i].properties.nombre;
            falla.appendChild(divNombreFalla);

            //Contenedor imagen e imagen falla
            let divImgFalla = document.createElement('div');
            divImgFalla.classList.add('contenedorImg');
            let img = document.createElement('img');
            img.setAttribute('src', imgABuscar);
            divImgFalla.appendChild(img);
            falla.appendChild(divImgFalla);

            //Contenedor con toda la info extra(ubicacion,puntuacion...)
            let divMetadatos = document.createElement('div');
            falla.appendChild(divMetadatos);

            //Boton ubicacion
            let btnUbicacion = document.createElement('button');
            btnUbicacion.innerHTML = 'UBICACIÓN';
            btnUbicacion.setAttribute('value', ubicacionFalla);
            btnUbicacion.addEventListener('click', mostrarUbicacion);
            divMetadatos.classList.add('contenedorMetadatos');
            divMetadatos.appendChild(btnUbicacion);

            //Puntuacion falla
            let formPuntuacion = document.createElement('form');
            let p = document.createElement('p');
            p.classList.add('puntuacion');
            for (let x = idLabelPtos, y = 5; x < idLabelPtos + 5; x++ , y--) {

                let input = document.createElement('input');
                input.setAttribute('id', 'radio' + x);
                input.setAttribute('type', 'radio');
                input.setAttribute('name', 'estrellas');
                input.setAttribute('value', y);
                p.appendChild(input);

                let label = document.createElement('label');
                label.setAttribute('for', 'radio' + x);
                label.innerHTML = '★';
                label.addEventListener('mouseup', anotarPuntuacion);
                p.appendChild(label);

            }
            /*Incrementamos la variable global en 5 para que sean distintas la siguiente tanda de estrellas
            De no ser asi cuando pulsamos sobre una estrella con un id igual a otra aplica cambios a la que tiene
            mismo id*/
            idLabelPtos += 5;
            formPuntuacion.appendChild(p);
            divMetadatos.appendChild(formPuntuacion);

        }

        anyoValido = false;
    }

}

function anotarPuntuacion() {

    console.log(this.previousSibling.value);

}

/*Ya que el formato filtroSeleccion se ha modificado para que sea mas legible he de adaptarlo para coincidir 
con la busqueda en el JSON */
function adaptarFiltroSeccion(filtro) {

    if (filtro == 'Seccion Especial') filtro = 'E';
    else if (filtro == 'Fuera de categoria') filtro = 'FC';
    else {
        let cont = filtro.indexOf(":");
        filtro = filtro.slice(++cont);

    }
    return filtro;
}


function validarAnyo(anyoFundacion) {

    let anyoValido = false;
    
    if (anyoFundacion >= seleccionDesdeAnyo && anyoFundacion <= seleccionHastaAnyo) anyoValido = true;

    return anyoValido;

}


function cargarSelectSeccion() {

    //Si hay contenido previo lo eliminamos 
    limpiarNodo(document.querySelector('select'));

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

function mostrarUbicacion() {

    // let coordenadas = convertirCoordenada(this.value);


    let divMapa = document.createElement('div');
    divMapa.setAttribute('id', 'map');
    document.querySelector('body').appendChild(divMapa);

    let altura = 600;
    let anchura = 500;
    console.log(window.screen.height);
    console.log(window.screen.width);
    let y = parseInt((window.screen.height / 2) - (altura / 2));
    let x = parseInt((window.screen.width / 2) - (anchura / 2));

    divMapa.style.left = x + 'px';
    divMapa.style.top = y + 'px';


    var map = L.map('map').
        setView([41.66, -4.72],
            14);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    L.control.scale().addTo(map);

}


function convertirCoordenada(coordenadas) {

    let firstProjection = '+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs';
    let secondProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

    //coordenadas = proj4(firstProjection, secondProjection, coordenadas);


}

function borrarContenido() {

    this.value = "";

    if (this.id == 'anyoDesde') seleccionDesdeAnyo = 0;
    if (this.id == 'anyoHasta') seleccionHastaAnyo = 3000;

}

function seleccionarAnyo() {

    if (this.value == '') {

        if (this.id == 'anyoDesde') this.value = 'Desde';
        if (this.id == 'anyoHasta') this.value = 'Hasta';

    } else {

        if (this.id == 'anyoDesde') seleccionDesdeAnyo = this.value;
        if (this.id == 'anyoHasta') seleccionHastaAnyo = this.value;

    }

    mostrarFallas();
}

function init() {

    obtenerJSON();
    seccionPpalActiva = true;
    seccionesPrincipales = [];
    seccionesInfantiles = [];
    seleccionHastaAnyo = 3000;
    seleccionDesdeAnyo = 0;
    idLabelPtos = 1;
    document.querySelector('input[value="principal"]').addEventListener('change', cambiarSeccion);
    document.querySelector('input[value="infantil"]').addEventListener('change', cambiarSeccion);
    document.querySelector('select').addEventListener('change', modificarSeccionBuscada);
    document.getElementById('anyoDesde').addEventListener('focus', borrarContenido);
    document.getElementById('anyoHasta').addEventListener('focus', borrarContenido);
    document.getElementById('anyoDesde').addEventListener('blur', seleccionarAnyo);
    document.getElementById('anyoHasta').addEventListener('blur', seleccionarAnyo);

}

//VARIABLES GLOBALES
let datosJSON;
let seccionPpalActiva;
let seccionesPrincipales;
let seccionesInfantiles;
let seleccionDesdeAnyo;
let seleccionHastaAnyo;
let idLabelPtos; //La combinacion input-label de las estrellas de puntuacion requieren id distintos


window.addEventListener('load', init);