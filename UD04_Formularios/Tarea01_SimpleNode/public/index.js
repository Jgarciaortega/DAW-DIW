function buscarResultados() {

    let request = 'http://mapas.valencia.es/lanzadera/opendata/RES_PILAS/JSON';
    let cadena;
    let busqueda = this.value.toUpperCase();
    let contenedorResult = document.getElementById('resultados');
    let table = '<table><tr><th>DIRECCION</th><th>CENTRO</th><th>DISTRITO</th></tr>';
    
    if(busqueda.length == 0){
        
        //Inicializamos el contenedor de resultados cada vez que borramos el input busqueda
        contenedorResult.innerHTML = ' ';

    }else{

        fetch(request)
        .then(response => response.json())
        .then(data => {

            console.log(data.features[0].properties);
            for (let i = 0; i < data.features.length; i++) {
                //Las calles comienzan con C/. Por ello reduzco la cadena para mejorar la busqueda
                cadena = acortarCadena(data.features[i].properties.direccion);
                //Compruebo las dos cadenas
                if (cadena.substring(0, busqueda.length) == busqueda) {

                    table += '<tr><td>';
                    table += data.features[i].properties.direccion;
                    table += '</td><td>';
                    table += data.features[i].properties.centro;
                    table += '</td><td>';
                    table += data.features[i].properties.n_distrito;
                    table += '</td></tr>';
                }
            }

            table += '</table>';
            contenedorResult.innerHTML = table;

        })
    }
}

function acortarCadena(cadena) {

    let newCadena = '';
    let puntoEncontrado = false;

    for (let i = 0; i < cadena.length; i++) {

        //Mientras no encontremos el punto no comenzamos a crear la nueva cadena. Ademas tb evito el espacio posterior al punto
        if (puntoEncontrado && cadena.charAt(i) != ' ') newCadena += cadena.charAt(i);

        if (cadena.charAt(i) == '.') puntoEncontrado = true;

    }

    return newCadena;
}


function init() {


    document.getElementById('entrada').addEventListener('keyup', buscarResultados);

}

let archivoJSON;

window.addEventListener('load', init);