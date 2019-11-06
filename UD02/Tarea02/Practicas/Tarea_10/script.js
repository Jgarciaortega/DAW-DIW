window.onload = init;


function init(){

    const button = document.querySelector("button");

    button.addEventListener('click', transicionar);

}

function transicionar(){

   let contenedores = document.querySelectorAll(".caja");

   contenedores.forEach(element => element.classList.toggle('movimiento'));
 
}