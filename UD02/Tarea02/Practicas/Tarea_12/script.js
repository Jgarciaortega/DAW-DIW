window.onload = init;

const nodoPadre = document.querySelector("container");

function init() {

    const button = document.querySelector("button");
    button.addEventListener("click", generarCaja);
}

function generarCaja() {

    const box = document.createElement('box');
    
    box.addEventListener('click', evolucionar);

    nodoPadre.appendChild(box);
    

}

function evolucionar(){

    this.classList.add('evoluciona');
    this.addEventListener('click', desevolucionar);

}

function desevolucionar(){

    this.classList.add('desevoluciona');
    this.addEventListener('click', ultimar);

}

function ultimar(){

    this.classList.add('ultimate');
    
}








