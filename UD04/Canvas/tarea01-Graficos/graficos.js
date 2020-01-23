function buildGrafico() {
    console.log('*Building Graphic');
    //variables comunes:
    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let type = document.getElementById('selectGraphic');
    let selectedType = type.options[type.selectedIndex].text;
    let padding = 20;
    let canvasActualWidth = canvas.width - padding * 2;
    let canvasActualHeight = canvas.height - padding * 2;
    //variables circle graphic:
    let circleGraphic = false;
    let total;
    let angulo;
    let inicioAngulo = 0;
    //variables bar graphic:
    let barGraphic = false;
    let maxNum;
    //variables point graphic:
    let pointGraphic = false;
    let startX = 0;
    let startY = canvasActualHeight + padding;
    let endX = 0;
    let endY = 0;

    //Init canvas:
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Init legend
    document.querySelector('legend[for="myCanvas"]').innerHTML = '';

    if (selectedType == 'Grafico tarta') circleGraphic = true;
    else if (selectedType == 'Grafico barras') barGraphic = true;
    else if (selectedType == 'Grafico puntos') pointGraphic = true;

    //averigua el mayor valor de los datos recogidos
    maxNum = getMaxNum();

    if (barGraphic || pointGraphic) {

        paintGrid(canvas, ctx, maxNum);
        createLegend();
    }

    for (let i = 1; i < 5; i++) {

        let clave = document.querySelector("input[name='key_" + i + "']").value;
        let valor = document.querySelector("input[name='value_" + i + "']").value;

        if (clave != '' && valor != '') {

            if (circleGraphic) {

                total = getValorTotal();

                angulo = 2 * Math.PI * valor / total;

                buildCircleGraphic(canvas, ctx, clave, angulo, inicioAngulo, colores[i]);

                inicioAngulo += angulo;

            } else if (barGraphic) {

                buildBarGraphic(canvas, ctx, maxNum, valor, colores[i], i, colores2[i], padding, canvasActualWidth, canvasActualHeight);

            } else if (pointGraphic) {

                valor = parseInt(valor);
                endX += canvas.width / 4 - 2;
                endY = canvas.height - (Math.round(canvasActualHeight * valor / maxNum) + padding);

                buildPointGraphic(ctx, startX, startY, endX, endY, colores[i]);

                startX = endX;
                startY = endY;
            }

        }
    }


}

function buildPointGraphic(ctx, startX, startY, endX, endY, color) {

    drawLine(ctx, startX, startY, endX, endY, color, 2);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function createLegend() {

    let legend = document.querySelector("legend[for='myCanvas']");
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'legend');
    legend.append(ul);
    let clave;

    for (let i = 1; i < 5; i++) {

        clave = document.querySelector("input[name='key_" + i + "']").value;
        let li = document.createElement('li');
        li.style.borderLeft = "20px solid " + colores[i];
        li.textContent = clave;
        ul.appendChild(li);

    }

}

/* PINTA ESCALA GRAFICA */
function paintGrid(canvas, ctx, maxNum) {

    let padding = 20;
    let canvasActualHeight = canvas.height - padding * 2;
    //valor inicial de la escala
    let gridValue = 0;
    //incremento de los valores de la escala
    let gridScale = Math.round(maxNum / 5);
    let gridY;

    while (gridValue <= maxNum) {

        gridY = canvasActualHeight * (1 - gridValue / maxNum) + padding;
        drawLine(ctx, 0, gridY, canvas.width, gridY, "#4C4B49", 1);
        ctx.save();
        ctx.fillStyle = "#4C4B49";
        ctx.font = "bold 15pt Calibri";
        ctx.fillText(gridValue, 10, gridY - 2);
        ctx.restore();
        gridValue += gridScale;

    }
}

function buildBarGraphic(canvas, ctx, maxNum, valor, color, index, color2, padding, canvasActualWidth, canvasActualHeight) {

    let barIndex = index - 1;
    let numberOfBars = 4;
    let barHeight = Math.round(canvasActualHeight * valor / maxNum);
    let barSize = (canvasActualWidth - 50) / numberOfBars;
    let marginRight = 12;
    let marginLeft = 35;

    let startX = (padding + barIndex * barSize) + marginRight + marginLeft;
    let startY = (canvas.height - barHeight - padding);

    let anchuraTrazo = 4;

    /*PINTA PROFUNDIDAD*/
    drawBar(ctx, startX + 5, startY - 5, barSize - marginRight, barHeight, color2);
    /*PINTA RECTANGULO*/
    drawBar(ctx, startX, startY, barSize - marginRight, barHeight, color);
    /* TRAZO 1 CERRAR ESQUINA IZQ*/
    drawLine(ctx, startX, startY, startX + 5, startY - 5, color2, anchuraTrazo);
    /* TRAZO 2 CERRAR ESQUINA DER*/
    drawLine(ctx, startX + barSize - marginRight, startY, startX + barSize - marginRight + 5, startY - 5, color2, anchuraTrazo - 3);
    /* TRAZO 3 CERRAR ESQUINA INF DER*/
    drawLine(ctx, startX + barSize - marginRight, startY + barHeight, startX + barSize - marginRight + 5, startY - 5 + barHeight, color2, anchuraTrazo);

}

function drawLine(ctx, startX, startY, endX, endY, color, anchuraTrazo) {

    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.lineWidth = anchuraTrazo;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}


function buildCircleGraphic(canvas, ctx, clave, angulo, inicioAngulo, color) {

    let radio = Math.min(canvas.width / 2, canvas.height / 2);

    //Dibuja quesitos:
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, radio, inicioAngulo, (inicioAngulo + angulo));
    ctx.closePath();
    ctx.fill();

    paintKey(canvas, ctx, clave, angulo, inicioAngulo, radio);

}

function paintKey(canvas, ctx, clave, angulo, inicioAngulo, radio) {

    let etiquetaX = canvas.width / 2 + (radio / 2) * Math.cos(inicioAngulo + angulo / 2);
    let etiquetaY = canvas.height / 2 + (radio / 2) * Math.sin(inicioAngulo + angulo / 2);

    if (etiquetaX < canvas.width / 2) etiquetaX -= 10;

    ctx.font = "bold 15pt Calibri";
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.fillText(clave, etiquetaX, etiquetaY);
    ctx.stroke();


}

function loadListeners() {
    document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}

function getMaxNum() {

    let maxNum = -1;

    for (let i = 1; i < 5; i++) {

        clave = parseInt(document.querySelector("input[name='key_" + i + "']"));
        valor = parseInt(document.querySelector("input[name='value_" + i + "']").value);
      
        if (valor > maxNum){

            maxNum = valor;
        } 

    }
  
    return maxNum;
}


function getValorTotal() {

    let total = 0;
    for (let i = 1; i < 5; i++) {

        clave = document.querySelector("input[name='key_" + i + "']");
        valor = document.querySelector("input[name='value_" + i + "']");

        if (clave.value != '' && valor.value != '') {

            total += parseInt(valor.value);

        }
    }

    return total;
}


function init() {
    console.log(" * Init ");
    loadListeners();

}

const colores2 = ['', 'darkred', 'darkblue', 'darkgreen', 'orange'];
const colores = ['', 'red', 'blue', 'green', 'yellow'];

window.onload = init;

