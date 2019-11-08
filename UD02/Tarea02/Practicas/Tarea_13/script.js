window.onload = init;

const nodoPadre = document.querySelector("container");
let rotacionActiva = false;
let rotacionV = false;
let contador = 0;

function init() {

    const button = document.querySelector("button");
    button.addEventListener("click", generarCaja);
    crearHeader();
}

function crearHeader() {

    let nodoHeader = document.querySelector('header');
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');

    div1.classList.add('poderRotar');
    div1.addEventListener('click', interruptorRotacion);

    div2.classList.add('poderV');
    div2.addEventListener('click', interruptorV);

    div3.classList.add('chuluStop');
    div3.addEventListener('click', stop);

    nodoHeader.appendChild(div1);
    nodoHeader.appendChild(div2);
    nodoHeader.appendChild(div3);

}


function generarCaja() {

    const box = document.createElement('box');

    if (contador < 20) {

        box.addEventListener('click', evolucionar);

        nodoPadre.appendChild(box);

        contador++;
    }
}

function evolucionar() {

    this.classList = 'evoluciona';
    this.addEventListener('click', desevolucionar);

}

function desevolucionar() {

    this.classList = 'desevoluciona';
    this.addEventListener('click', ultimar);

}

function ultimar() {

    this.classList.add('ultimate');
    this.addEventListener('click', rotacion);
    this.addEventListener('click', moverV)

}

function rotacion() {

    if (rotacionActiva) {

        this.classList.add('rotacion');

    }

}

function moverV() {

    if (rotacionV) {

        this.classList.add('movimientoV');

    }
}

function interruptorV() {

    if (!rotacionV) {

        rotacionV = true;
        rotacionActiva = false;

    }

}

function interruptorRotacion() {

    if (!rotacionActiva) {

        rotacionActiva = true;
        rotacionV = false;
    }

}

function stop() {

    let boxs = document.querySelectorAll('box');

    boxs.forEach (box => box.classList.remove('movimientoV'));
    boxs.forEach (box => box.classList.remove('rotacion'));
}






