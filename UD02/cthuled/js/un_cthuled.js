



window.onload = function() {

   crearMapa();

}

function crearMapa(){

    var mapa = [[0 , 0,  0,  0 , 0 ,  0 , 0 , 0,  0, 0 , 0,  0, 0 , 0,  0, 0 , 0,  0,  0,  0 ] ,
                [0 , 0,  0,  0 , 0 ,  0 , 0 , 0,  0, 0 , 0,  0, 0 , 0,  0, 0 , 0,  0,  0,  0,],
                [0 , 0,  0,  0 , 0 ,  0 , 0 , 0,  0, 0 , 0,  0, 0 , 0,  0, 0 , 0,  0,  0,  0]];

    for (let i = 0; i < 20; i++){

        var newDiv = document.createElement("div");
    
         for(let j = 0; j < 3; j++){
    
             if(mapa[j][i] == 0){
    
                newDiv.classList.add("camino");
    
             }
    
    
         }

         document.querySelector(".mapa").appendChild(newDiv);
    
     }

    }


