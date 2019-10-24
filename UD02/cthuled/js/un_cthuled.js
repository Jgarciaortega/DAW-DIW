

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

//VIDAS
var vidas = 4;

//Array de villanos
var villanos;

//Nivel de pantalla
var nivel = 4;

//Interruptor inicio movimiento villanos(no se acciona hasta que jugador mueve)
var inicio = false;


window.onload = function () {

    crearCabecera();
    crearMapa();

}

window.addEventListener("keydown", function (event) {

    recogerPulsacion(event.key);

});




setInterval(activarVillanos, 500);


function recogerPulsacion(event) {

    let posJugador = document.getElementById(y + " " + x);

    if (event == "ArrowDown") {

        inicio = true;

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

        if (y > 0 && x < 20 && mapa[y][x + 1] != 1) {

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

        if (y > 0 && x > 0 && mapa[y][x - 1] != 1) {

            posJugador.classList.remove("sonic" + direccion);
            posJugador.classList.add("caminoPisado");
            x--;
            direccion = "Left";
            posJugador = document.getElementById(y + " " + x);
            posJugador.classList.add("sonicLeft");
            mapa[y][x] = 4;

        }

    }

    comprobarColumnas();


    if (vidas = 0) finDeJuego();

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

function crearCabecera() {

    let nodoPadre = document.getElementById("header");
    let divScore = document.createElement("div");
    let divLevel = document.createElement("div");
    let texto = "";

    divScore.setAttribute("id", "score");
    texto = document.createTextNode("SCORE");
    divScore.appendChild(texto);

    divLevel.setAttribute("id", "level");
    texto = document.createTextNode("LEVEL " + nivel);
    divLevel.appendChild(texto);

    nodoPadre.appendChild(divScore);
    nodoPadre.appendChild(divLevel);

    for (let i = 0; i < 4; i++) {

        let divLifes = document.createElement("div");
        divLifes.setAttribute("class", "vidas");
        divLifes.setAttribute("id", i);
        nodoPadre.appendChild(divLifes);

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
    crearVillanos(nivel);


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
function Villano(nombre = "", x = 0, y = 0, direccion = "", alerta = false, memoriaCoordenada = 0) {

    this.nombre = nombre;
    this.posX = x;
    this.posY = y;
    this.direccion = direccion;
    this.alerta = alerta;
    this.memoriaCoordenada = memoriaCoordenada;

};

//Creacion y colocacion en el tablero
function crearVillanos(cantidadDeVillanos) {

    villanos = [];

    for (let i = 0; i < cantidadDeVillanos; i++) {

        let villano = new Villano("villano" + i, generarAleatorioX(), Math.floor(Math.random() * (13 - 8)) + 8, "Right", false, 0);

        villanos.push(villano);

    }

    for (let i = 0; i < villanos.length; i++) {

        let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);
        div.classList.add("eggmanStatic");

    }

}


function generarAleatorioX() {


    let posiciones = [0, 4, 12, 16, 20];

    return posiciones[Math.floor(Math.random() * 5)];


}

function activarVillanos() {

    if (inicio) {

        for (let i = 0; i < villanos.length; i++) {

            let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);
            eligeDireccion(villanos[i]);

            let div2 = document.getElementById(villanos[i].posY + " " + villanos[i].posX);

            modificarDiv(div, div2, villanos[i].direccion);

        }
    }
}

function eligeDireccion(villano) {


    //BUSCA SOLO ENTRE COLUMNAS
    if (y == 1 || y == 4 || y == 7 || y == 10 || y == 13) {

        if (y == villano.posY) {

            if (x < villano.posX && villano.direccion != "Right") {

                villano.direccion = "Left";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            } 

            if (x > villano.posX && villano.direccion != "Left") {

                villano.direccion = "Right";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }       

        }

    }

    if (x == 0 || x == 4 || x == 8 || x == 12 || x == 16 || x == 20) {

        if (x == villano.posX) {

            if (y < villano.posY && villano.direccion != "Down") {

                villano.direccion = "Up";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            } 

            if (y > villano.posY && villano.direccion != "Up") {

                villano.direccion = "Down";
                villano.alerta = true;
                villano.memoriaCoordenada = x;

            }       
        }
    }

    //MOVIMIENTO ALEATORIO VILLANO

    if (!villano.alerta) {

        if (villano.direccion == "Up" || villano.direccion == "Down") {


            if (villano.posY < 13) {

                if (mapa[villano.posY][villano.posX - 1] == 0 || mapa[villano.posY][villano.posX - 1] == 4 ||
                    mapa[villano.posY][villano.posX + 1] == 0 || mapa[villano.posY][villano.posX + 1] == 4) {

                    villano.direccion = direccionRandom(villano.direccion);

                }


            } else {


                villano.direccion = direccionRandom(villano.direccion);
            }

        }

        if (villano.direccion == "Right" || villano.direccion == "Left") {

            if (villano.posY < 13) {

                if (mapa[villano.posY - 1][villano.posX] == 0 || mapa[villano.posY - 1][villano.posX] == 4 ||
                    mapa[villano.posY + 1][villano.posX] == 0 || mapa[villano.posY + 1][villano.posX] == 4) {

                    villano.direccion = direccionRandom(villano.direccion);


                }

            } else {

                if (villano.posX == 0) villano.direccion = "Up";
                if (villano.posX == 20) villano.direccion = "Up";
            }

        }


        moverVillano(villano, 1);

    } else {

        if (villano.direccion == "Right" || villano.direccion == "Left") {

            if (villano.posX != villano.memoriaCoordenada && villano.posX != 20 && villano.posX != 0) {

                if (villano.posX == 19 || villano.posX == 1 || villano.posX - villano.memoriaCoordenada == 1) {

                    moverVillano(villano, 1);

                } else {

                    moverVillano(villano, 2);

                }

                console.log("villano " + villano.posY + " " + villano.posX);
                console.log("horizontal memoria " + villano.memoriaCoordenada);



            } else {
                moverVillano(villano, 2);
                villano.alerta = false;
            }


        }

        if (villano.direccion == "Up" || villano.direccion == "Down") {

            if (villano.posY != villano.memoriaCoordenada && villano.posY != 13 && villano.posY != 1) {

                if (villano.posY == 12 || villano.posY == 2 || villano.posY - villano.memoriaCoordenada == 1) {

                    moverVillano(villano, 1);

                } else {

                    moverVillano(villano, 2);
                }

                console.log("villano " + villano.posY + " " + villano.posX);
                console.log("vertical memoria " + villano.memoriaCoordenada);
            } else {

                moverVillano(villano, 2);
                villano.alerta = false;
            }

        }

    }



    if (villano.posX == x && villano.posY == y) {


        restarVida();

    }


}

function restarVida() {

    let div = document.getElementById(y + " " + x);

    div.classList.remove("sonicLeft");
    div.classList.remove("sonicRight");
    div.classList.remove("sonicUp");
    div.classList.remove("sonicDown");

    div = document.getElementById(0 + " " + 8);
    x = 8;
    y = 0;
    direccion = "Static";
    div.classList.add("sonicStatic");

    div = document.getElementById(vidas);
    console.log(vidas);
    div.classList.remove("vidas");

    for (let i = 0; i < villanos.length; i++) {

        let div = document.getElementById(villanos[i].posY + " " + villanos[i].posX);

        div.classList.remove("eggmanUp");
        div.classList.remove("eggmanDown");
        div.classList.remove("eggmanLeft");
        div.classList.remove("eggmanRight");

    }


    crearVillanos(nivel);
    inicio = false;

    vidas--;
}

function finDeJuego() {


}

function modificarDiv(div, div2, direccion) {

    div.classList.remove("eggmanStatic");
    div.classList.remove("eggmanUp");
    div.classList.remove("eggmanDown");
    div.classList.remove("eggmanLeft");
    div.classList.remove("eggmanRight");
    div2.classList.add("eggman" + direccion);

}

function moverVillano(villano, avance) {


    if (villano.direccion == "Down") {

        if (villano.posY < 13 && mapa[villano.posY + 1][villano.posX] != 1) {

            villano.posY += avance;
        }


    }

    if (villano.direccion == "Up") {

        if (villano.posY > 1 && mapa[villano.posY - 1][villano.posX] != 1) {

            villano.posY -= avance;

        }



    }
    if (villano.direccion == "Right") {

        if (villano.posX < 20 && mapa[villano.posY][villano.posX + 1] != 1) {

            villano.posX += avance;
        }



    }

    if (villano.direccion == "Left") {

        if (villano.posX > 0 && mapa[villano.posY][villano.posX - 1] != 1) {

            villano.posX -= avance;

        }

    }



}

function direccionRandom(direccionPrevia) {

    let direcciones = ["Left", "Right", "Up", "Down"];
    let direccion = "";
    let direccionNoValida = true;

    while (direccionNoValida) {

        direccion = direcciones[Math.floor(Math.random() * 4)];

        if (direccion == "Left" && direccionPrevia != "Right") {

            direccionNoValida = false;
        }
        if (direccion == "Right" && direccionPrevia != "Left") {

            direccionNoValida = false;

        }
        if (direccion == "Up" && direccionPrevia != "Down") {

            direccionNoValida = false;

        }
        if (direccion == "Down" && direccionPrevia != "Up") {

            direccionNoValida = false;
        }

    }

    return direccion;

}




