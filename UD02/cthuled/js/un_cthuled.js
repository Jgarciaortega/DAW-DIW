var mapa = [

    [9, 9, 9, 9, 9, 9, 9, 9, 2, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
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
    [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];



window.onload = function () {

    crearMapa();

}

window.addEventListener("keydown", function (event) {

    recogerPulsacion(event.key);

}, false);


function recogerPulsacion(event) {


    if (event == "ArrowDown") {

       
        
    }


    if (event == "ArrowUp") {



    }


    if (event == "ArrowRight") {



    }


    if (event == "ArrowLeft") {



    }



}


function crearMapa() {

   // alert(mapa[1][8]);

    for (let i = 0; i < mapa.length; i++) {

        for (let j = 0; j < mapa[0].length; j++) {

            imprimir(i, j, mapa);
        }


    }


    function imprimir(PosI, PosJ, mapa) {

        var newDiv = document.createElement("div");

        if (mapa[PosI][PosJ] == 0) {

            newDiv.classList.add("camino");
        }

        if (mapa[PosI][PosJ] == 1) {

            newDiv.classList.add("columna");
        }

        if (mapa[PosI][PosJ] == 2) {

            newDiv.classList.add("jugador");
        }

        if (mapa[PosI][PosJ] == 3) {

            newDiv.classList.add("momia");
        }

        // var t = document.createTextNode(mapa[PosI][PosJ]);
        // newDiv.appendChild(t);
        document.getElementById("mapa").appendChild(newDiv);

    }

}


