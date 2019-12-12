
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
    let contFichasFallas = document.getElementById('fichasFallas');
    let anyoValido = false;

    /*Ya que el formato filtroSeleccion es (Seccion: datoSeccion) he de adaptarlo para coincidir con la busqueda
    del JSON*/
     filtroSeccion = adaptarFiltroSeccion(filtroSeccion);

    let seccionABuscar;
    let imgABuscar;
    let anyoFundacion;

    console.log(datosJSON);

    limpiarNodo(contFichasFallas);

    for (let i = 0; i < datosJSON.features.length; i++) {

        if(seccionPpalActiva){

            seccionABuscar = datosJSON.features[i].properties.seccion;
            imgABuscar = datosJSON.features[i].properties.boceto;
            anyoFundacion = datosJSON.features[i].properties.anyo_fundacion;

        } 
        else{

            seccionABuscar = datosJSON.features[i].properties.seccion_i;
            imgABuscar = datosJSON.features[i].properties.boceto_i;
            anyoFundacion = datosJSON.features[i].properties.anyo_fundacion_i;
        }

        anyoValido = validarAnyo(anyoFundacion);

        if (filtroSeccion == seccionABuscar || 
            filtroSeccion == 'Todas las secciones' && anyoValido) {

            let falla = document.createElement('div');
            let img = document.createElement('img');
            img.setAttribute('src', imgABuscar);
            falla.appendChild(img);
            fichasFallas.appendChild(falla);

        }
    }

}

 /*Ya que el formato filtroSeleccion es (Seccion: datoSeccion) he de adaptarlo para coincidir con la busqueda
    del JSON*/
function adaptarFiltroSeccion(filtro){

    let cont = filtro.indexOf(":");

    filtro = filtro.slice(++cont);

    return filtro;

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

function borrarContenido(){

   this.value = "";
}

function seleccionarAnyo(){

    if(this.value == ''){

        if(this.id == 'anyoDesde') this.value = 'Desde';
        if(this.id == 'anyoHasta') this.value = 'Hasta';

    }else{

        if(this.id == 'anyoDesde') seleccionDesdeAnyo = this.value;
        if(this.id == 'anyoHasta') seleccionHastaAnyo = this.value;

    }
}




function init() {

    obtenerJSON();
    seccionPpalActiva = true;
    seccionesPrincipales = [];
    seccionesInfantiles = [];
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

window.addEventListener('load', init);