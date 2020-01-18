

function buildGrafico(){
    console.info(" * Construyendo grafico ");
    const canvas = document.querySelector('canvas');

    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'purple';
    ctx.beginPath();

    ctx.arc(200,200,100,-Math.PI/2,0);

    ctx.stroke();


}

function loadListeners(){
    document.querySelector("input[name='grafiqueame']").addEventListener("click",buildGrafico);
}


function init(){
    console.log(" * Init ");
    loadListeners();
    
}

window.onload=init;