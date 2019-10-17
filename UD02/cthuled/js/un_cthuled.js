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

        if (y < 13 && mapa[y + 1][x] != 2) {

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


        }
    }

    if (event == "ArrowUp") {

        if (y > 1 && mapa[y - 1][x] != 2) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            y--;
            direccion = "Up";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicUp");


        }
    }

    if (event == "ArrowRight") {


        if (x < 20 && mapa[y][x + 1] != 2) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            x++;
            direccion = "Right";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicRight");


        }
    }

    if (event == "ArrowLeft") {

        if (x > 0 && mapa[y][x - 1] != 2) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            x--;
            direccion = "Left";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicLeft");


        }


    }

    //Marcamos a cada paso las columnas que rodeamos marcando su valor en la matriz
    marcarColumna(y, x);

}

function marcarColumna(PosY, PosX) {

    let hayCambio = false;
    let div;


    if (mapa[PosY][PosX + 1] == 1) {

        mapa[PosY][PosX + 1] = 2;

        comprobarColumna(PosY, PosX + 1);
        cambiarColorColumna(PosY, PosX + 1);
        //console.log("derecha" + PosY, PosX+1);

    }

    if (mapa[PosY][PosX - 1] == 1) {

        mapa[PosY][PosX - 1] = 2;

        comprobarColumna(PosY, PosX - 1);
        cambiarColorColumna(PosY, PosX - 1);
        //console.log("izquierda" + PosY, PosX-1);
    }

    if (PosY < 13) {

        if (mapa[PosY + 1][PosX] == 1) {

            mapa[PosY + 1][PosX] = 2;

            comprobarColumna(PosY + 1, PosX);
            cambiarColorColumna(PosY + 1, PosX);
        }
    }


    if (mapa[PosY - 1][PosX] == 1) {

        mapa[PosY - 1][PosX] = 2;

        comprobarColumna(PosY - 1, PosX);
        cambiarColorColumna(PosY - 1, PosX);

    }


}


function cambiarColorColumna(y, x) {


    div = document.getElementById(y + " " + x);
    div.classList.remove("columna");
    div.classList.add("columnaMarcada");
}

function comprobarColumna(PosY, PosX) {

    let posicionamientoY = "";
    let completa = false;
    let y = PosY;
    let x = PosX;

    /**Comprobacion posicionamientoY**/

    //1- Arriba
    if (mapa[PosY + 1][PosX] == 2) {

        posicionamientoY = "abajo";
        let y = PosY++;
        //console.log(y + " " + x);
        //console.log("Abajo");

        //2- Abajo
    } else if (mapa[PosY - 1][PosX] == 2) {

        posicionamientoY = "arriba";
        let y = PosY--;
        //console.log(y + " " + x);
        //console.log("Arriba");
    }

    /**Comprobacion Horizontal**/
    if (posicionamientoY == "abajo" || posicionamientoY == "arriba") {

        //1- Centro
        if (PosX % 2 == 0) {

            completa = comprobar(posicionamientoY, "centro");
            console.log("centro");

        //2- Esquina
        } else {

            completa = comprobar(posicionamientoY, "esquina");
            console.log("esquina");
        }

    }

    return completa;

}


function comprobar(posicionY, posicionX){

    if(posicionY == "arriba" && posicionX == "centro"){



    }

    comprobar(posicionamientoY, posicionamientoX){
    
}


function moverVillano() {


    // //ABAJO
    // if (yV < 13 && mapa[y+1][x] != 1) {



    // }

    // //ARRIBA
    // if (yV > 1 && mapa[y-1][x] != 1) {


    // }

    // //DERECHA
    // if (xV < 20 && mapa[y][x+1] != 1) {

    // }

    // //IZQUIERDA
    // if (xV > 0 && mapa[y][x-1] != 1) {


    // }

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

        if (PosI != 0) newDiv.classList.add("camino");

        if (mapa[PosI][PosJ] == 1) newDiv.classList.add("columna");


        if (mapa[PosI][PosJ] == 2) newDiv.classList.add("sonicStatic");


        if (mapa[PosI][PosJ] == 3) newDiv.classList.add("eggmanStatic");


        document.getElementById("mapa").appendChild(newDiv);

    }

}
