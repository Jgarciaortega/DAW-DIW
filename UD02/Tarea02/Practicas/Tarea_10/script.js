// window.onload = init;


// function init(){

//     const button = document.querySelector("button");

//     button.addEventListener('click', transicionar);

// }

// function transicionar(){

   

//    contenedores.forEach(element => element.classList.toggle('movimiento'));
 
// }


//Version en una línea

window.onload = document.querySelector('button').addEventListener('click', function transicionar(){document.querySelectorAll(".caja").forEach (element => element.classList.toggle('movimiento'));})
