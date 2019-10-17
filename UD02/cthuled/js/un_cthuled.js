var mapa = [

    [9, 9, 9, 9, 9, 9, 9, 9, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];

//Elementos que deben contener ocultas las columnas
var elementos = ["Llave","Pergamino","Villano","Esmeralda"];

//BOOLEAN PARA ABRIR PUERTA SALIDA
var salida = true;

//POSICION INICIAL JUGADOR
var x = 8;
var y = 0;
var direccion = "Static";

//POSICION VILLANO
var xV = 8;
var yV = 9;
var direccionV = "Left";



window.onload = function () {

    crearMapa();

}

window.addEventListener("keydown", function (event) {

    recogerPulsacion(event.key);

});


function recogerPulsacion(event) {

    let posJugador = document.getElementById(y + " " + x);

    // moverVillano();

    if (event == "ArrowDown") {

        if (y < 13 && mapa[y + 1][x] != 1) {

            posJugador.classList.remove("sonic" + direccion);

            if (salida) {

                salida = false;

            } else {

                posJugador.classList.add("caminoPisado");

            }

            y++;
            direccion = "Down";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicDown");
            mapa[y][x] = 4;

        }
    }

    if (event == "ArrowUp") {

        if (y > 1 && mapa[y - 1][x] != 1) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            y--;
            direccion = "Up";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicUp");
            mapa[y][x] = 4;


        }
    }

    if (event == "ArrowRight") {


        if (x < 20 && mapa[y][x + 1] != 1) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            x++;
            direccion = "Right";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicRight");
            mapa[y][x] = 4;

        }
    }

    if (event == "ArrowLeft") {

        if (x > 0 && mapa[y][x - 1] != 1) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            x--;
            direccion = "Left";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicLeft");
            mapa[y][x] = 4;

        }

    }

    
    //Marcamos a cada paso las columnas que rodeamos marcando su valor en la matriz
   // marcarCamino(y, x);

}



function crearMapa() {

    for (let i = 0; i < mapa.length; i++) {

        for (let j = 0; j < mapa[0].length; j++) {

            imprimir(i, j, mapa);
        }

    }

    function imprimir(PosI, PosJ, mapa) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", PosI + " " + PosJ);
        let elemento = "";

        if (PosI != 0) newDiv.classList.add("camino");

        if (mapa[PosI][PosJ] == 1){

            newDiv.classList.add("columna");

            if(PosJ % 2 == 0 && PosI % 2 != 0){
          
                elemento = elegirElemento();
                console.log(elemento);
               newDiv.classList.add("columna" + elemento);

            }
                 
        } 
        
        if (mapa[PosI][PosJ] == 2) newDiv.classList.add("sonicStatic");


        if (mapa[PosI][PosJ] == 3) newDiv.classList.add("eggmanStatic");


        document.getElementById("mapa").appendChild(newDiv);

    }

    
    //console.table(mapa);

}


function elegirElemento(){

    let aleatorio = Math.round(Math.random()*elementos.length);
    let elemento = "";
   
    elemento = elementos[aleatorio]; 
    elementos.splice(aleatorio,1);

    return elemento;

}
