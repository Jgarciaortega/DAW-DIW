window.onload = init;


const nodoPadre = document.querySelector("container");

function init() {

    const button = document.querySelector("button");
    button.addEventListener("click", generarCaja);
    crearHeader();
}

function crearHeader(){

    let nodoHeader = document.querySelector('header');
    const div1 = document.createElement('div') ;
    const div2 = document.createElement('div') ;

    div1.classList.add('poderRotar');
    div2.classList.add('poderV');

    nodoHeader.appendChild(div1);
    nodoHeader.appendChild(div2);

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
    this.addEventListener('click',animar);
    
}

function animar(){

    this.classList.add('rotacion');
}







