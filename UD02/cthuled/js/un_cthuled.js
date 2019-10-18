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

//Columna descubierta = true cubierta = false;
var estadoColumnas = [];

//Elementos que deben contener ocultas las columnas
var elementos = ["Llave", "Pergamino", "Villano", "Esmeralda"];

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
            //console.log("y= " + y + "x= " + x);

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
            //console.log("y= " + y + "x= " + x);

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
            //console.log("y= " + y + "x= " + x);
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
            //console.log("y= " + y + "x= " + x);
        }

    }

    //console.table(mapa);
    comprobarColumnas();

    //Marcamos a cada paso las columnas que rodeamos marcando su valor en la matriz
    // marcarCamino(y, x);

}

// Esta funcion genera las coordenadas que corresponden a las esquinas de las cajas  
function comprobarColumnas() {

    let completa;

    for (let y = 1; y < 13; y += 3) {

        for (let x = 1; x < 20; x += 4) {

            completa = false;

            completa = rodearColumna(y, x);
            estadoColumnas.push(completa);

        }
       
    }

    console.table(estadoColumnas);
    estadoColumnas = [];

}

//Con las coordenadas de las esquinas de la caja la rodea para comprobar pisadas (si 14 pisadas devuelve true )
function rodearColumna(PosY, PosX) {

    let completa = false;
    let cont = 0;

    for (let x = 0; x < 4; x++) {

        if (x < 3) PosX++;

        if (mapa[PosY][PosX] == 4) {

            cont++;

        }

    }

    PosY++;

    for (let y = 0; y < 3; y++) {

        if (y < 2) PosY++;
        if (mapa[PosY][PosX] == 4) {

            cont++;
        }
       

    }

    PosX--;

    for (let x = 0; x < 4; x++) {

        if (x < 3) PosX--;

        if (mapa[PosY][PosX] == 4) {

            cont++;
        }

    }

    PosY--;


    for (let y = 0; y < 3; y++) {

        if (y < 2) PosY--;

        if (mapa[PosY][PosX] == 4) {

            cont++;
        }
    }

    if (cont == 14) {

        completa = true;
    }

    return completa;
}


function crearMapa() {

    let numColumna = 0;
    let cont1 = 0;

    for (let i = 0; i < mapa.length; i++) {

        for (let j = 0; j < mapa[0].length; j++) {

            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", i + " " + j);
            let elemento = "";
    
    
            if (i != 0) newDiv.classList.add("camino");
    
            if (mapa[i][j] == 1) {

            // if (PosJ % 2 == 0 && PosI % 2 != 0) {

            //     elemento = elegirElemento();

            //     newDiv.classList.add("columna" + elemento);

            // }
    
                newDiv.classList.add("columna");
                newDiv.classList.add("columna" + numColumna);


            }
    
            if (mapa[i][j] == 2) newDiv.classList.add("sonicStatic");
    
    
            if (mapa[i][j] == 3) newDiv.classList.add("eggmanStatic");
    
    
            document.getElementById("mapa").appendChild(newDiv);
    
        }
    
        }

    }


function elegirElemento() {

    let aleatorio = Math.round(Math.random() * elementos.length);
    let elemento = "";

    elemento = elementos[aleatorio];
    elementos.splice(aleatorio, 1);

    return elemento;

}
