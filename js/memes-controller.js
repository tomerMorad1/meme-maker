'use strict'

var gCanvas;
var gCtx;

function renderCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg()
}


function resizeCanvas() {

    var elContainer = document.querySelector('.canvas-container');

    gCanvas.width = elContainer.offsetWidth - 20
    gCanvas.height = elContainer.offsetWidth - 20



    renderCanvas()
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function drawImg() {
    var meme = getMeme();
    var img = new Image()
    img.src = `meme-img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}


function onSetTxt(val) {
    getTxt(val);
    renderCanvas();
    // drawImg()
    setTxt();

}

function setTxt() {
    var meme = getMeme();
    var img = new Image();
    const textLines = meme.lines;

    // console.log('textLines', textLines);
    img.src = `meme-img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        textLines.forEach((line) => {
            drawText(line.txt, line.size, line.align, line.color, line.fill, line.font, line.x, line.y);
        })
    }
}

function drawText(txt, size, align, color, fill, font, x, y) {
    gCtx.lineWidth = 1;
    gCtx.font = ` ${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = fill;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}


function onChangeFontSize(condition) {
    // console.log('condition', condition);
    if (condition === 'increase') changeFontSize(+2);
    else changeFontSize(-2);
    setTxt()
    clearCanvas()
    renderCanvas()
    setTxt()
}


function onChangePos(direction) {
    // console.log('direction', direction);
    if (direction === 'up') changePos(-10);
    else changePos(+10);
    setTxt()
    clearCanvas()
    renderCanvas()
    setTxt()
}


function onRemoveLine() {
    markLine()
    clearCanvas()
    renderCanvas()
    clearInput()
}

function clearInput() {
    var elInput = document.querySelector('[name="text-edit"]')
    elInput.value = '';
}

function onAddLine() {
    creatLine();
    changeLine();
    markLine()
    clearInput();
}

function onChangeText() {
    changeTxt()

}


function onSwitchLine() {
    changeLine();
    markLine()
    setTxt();
}

function onRemoveLine() {
    removeLine();
    clearInput();
    renderCanvas();
    setTxt();
}

function drawRect() {
    var line = getLine()

    // var currTxt = getCurrTxt()
    // document.querySelector('.switch-line-btn').value = currTxt;
    // var txt = gCtx.measureText(currTxt);

    gCtx.beginPath()
    gCtx.rect(line.x - 25, line.y - line.size, line.width + 20, line.size + 10);
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function markLine(width) {
    drawRect(width)
}

function onChangeAlign(align) {
    if (align === 'left') changeAlign(100)
    if (align === 'center') changeAlign(250)
    if (align === 'right') changeAlign(400)
    renderCanvas()
    setTxt()
}

function onChangeTxtFont(font) {
    ChangeTxtFont(font);
    renderCanvas()
    setTxt()
}

function onChangeTxtStroke(color) {
    changeTxtStroke(color)
    renderCanvas()
    setTxt()
}

function onChangeTxtColor(color) {
    changeTxtColor(color)
    renderCanvas()
    setTxt()
}