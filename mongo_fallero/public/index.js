
function cargarJSON(){

    let request = 'http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON';
    let fichasFallas = document.getElementById('fichasFallas');

    fetch(request)
    .then(response => response.json())
    .then(datos => {

        for(let i = 0; i < datos.features.length; i++){

            let falla =  document.createElement('div');
            let img = document.createElement('img');
            img.setAttribute('src', datos.features[i].properties.boceto);
            falla.appendChild(img);
            fichasFallas.appendChild(falla);

        }
       
    })

}

function cambiarSeccion(){

    console.log('ok');
}


function init(){

   cargarJSON();
    document.querySelector('input[type="radio"]').addEventListener('change',cambiarSeccion);


}

window.addEventListener('load', init);