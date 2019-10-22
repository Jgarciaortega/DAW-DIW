

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];

//Columna descubierta = true cubierta = false;
var estadoColumnas = [];

//BOOLEAN PARA ABRIR PUERTA SALIDA
var salida = true;

//POSICION INICIAL JUGADOR
var x = 8;
var y = 0;
var direccion = "Static";

//Array de villanos
var villanos = [];

//Nivel de pantalla
var nivel = 1;


window.onload = function () {

    crearMapa();

}

window.addEventListener("keydown", function (event) {

    recogerPulsacion(event.key);

});


//setInterval(moverVillano,200);

function recogerPulsacion(event) {

    let posJugador = document.getElementById(y + " " + x);

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


        if (y > 0 && x < 20 && mapa[y][x + 1] != 1) {

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

        if (y > 0 && x > 0 && mapa[y][x - 1] != 1) {

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

    
    comprobarColumnas();


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

    revisarEstilos(estadoColumnas);
    estadoColumnas = [];

}

//Con las coordenadas de las esquinas de la caja la rodea para comprobar pisadas (si 14 pisadas devuelve true )
function rodearColumna(PosY, PosX) {

    let completa = false;
    let cont = 0;
    

    for (let x = 0; x < 4; x++) {

        if (mapa[PosY][PosX] == 4) {
            
            cont++;
           
        }

        PosX++;

    }

    PosY++;
    PosX--;

    for (let y = 0; y < 3; y++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;

        }

        PosY++;
    }

    PosX--;
    PosY--;

    for (let x = 0; x < 4; x++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;
        }

        PosX--;

    }

    PosY--;
    PosX++;


    for (let y = 0; y < 3; y++) {

        if (mapa[PosY][PosX] == 4) {

            cont++;
    
        }

        PosY--;
    }

    if (cont == 14) {

        completa = true;

    }

    return completa;
}


function revisarEstilos(estadoColumnas) {

    let columnasModificadas = [];

    for (let i = 0; i < estadoColumnas.length; i++) {

        if (estadoColumnas[i] == true) {

            columnasModificadas = document.getElementsByClassName("columna" + i);
            modificarEstilo(columnasModificadas);

        }
    }

}

function modificarEstilo(columnasModificadas) {

    for (let i = 0; i < columnasModificadas.length; i++) {

        columnasModificadas[i].classList.remove("columna");

    }

}

function crearMapa() {

    let numColumna = 0;
    let memoColumna = 0;
    let cont1 = 0;
    let cont2 = 0;
    let contY = 2;

    for (let y = 0; y < mapa.length; y++) {

        for (let x = 0; x < mapa[0].length; x++) {

            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", y + " " + x);
            let elemento = "";

            /* RELLENA CAMINO */
            if (y != 0) newDiv.classList.add("camino");

            /* RELLENA COLUMNAS Y ASIGNA SUS POSIBLES CLASES */
            if (mapa[y][x] == 1 && contY == y) {

                newDiv.classList.add("columna");
                newDiv.classList.add("columna" + numColumna);

                cont1++;

                if (cont1 == 3) {

                    numColumna++;
                    cont1 = 0;

                }

                if (x == 19) {

                    if (cont2 == 0) {

                        contY++;
                        cont2++;
                        numColumna = memoColumna;

                    } else {

                        cont2 = 0;
                        contY += 2;
                        memoColumna = numColumna;

                    }

                }

            }

            if (mapa[y][x] == 2) newDiv.classList.add("sonicStatic");


            document.getElementById("mapa").appendChild(newDiv);

        }

    }

    asignarElementosEnTablero();
    crearVillano(nivel);


}

function asignarElementosEnTablero() {

    //Elementos que deben contener ocultas las columnas
    let elementos = ["Llave", "Pergamino", "Villano", "Esmeralda", "Nada", "Nada", "Nada", "Nada", "Nada"
        , "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada", "Nada"];

    let elemento = "";

    let serieAleatoria = generarSerieAleatoria();

    for (let i = 0; i < 20; i++) {

        let divsColumnas = document.getElementsByClassName("columna" + serieAleatoria[i]);
        elegirElemento(divsColumnas, elementos[i]);


    }
}

function generarSerieAleatoria() {

    var listaNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

    var i, j, k;

    for (i = listaNum.length; i > 0; i--) {

        j = Math.floor(Math.random() * i);
        k = listaNum[i - 1];

        listaNum[i - 1] = listaNum[j];
        listaNum[j] = k;

    }

    return listaNum;

}

function elegirElemento(divsColumnas, elemento) {

    for (let i = 0; i < divsColumnas.length; i++) {

        divsColumnas[i].classList.add("columna" + elemento);
    }

}

/****  CREACION DE VILLANOS *****/

//Constructor de villanos
function Villano (nombre = "" ,x = 0 , y = 0){

    this.nombre = nombre;
    this.posX = x;
    this.posY = y;

};


function crearVillano(cantidadDeVillanos){

    for (let i = 0; i < cantidadDeVillanos; i++){

        let villano = new Villano("villano" + i, i , 13);
        villanos.push(villano);

    }

    for(let i = 0; i < villanos.length; i++){

       let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);
       div.classList.add("eggmanStatic");
      
    }

}

