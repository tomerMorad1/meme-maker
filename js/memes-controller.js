'use strict'

var gCanvas;
var gCtx;

function renderCanvas() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg()
    setTxt();
    changeInput()
    markLine()
}

function isMobile(screenWidth) {
    var screenWidth = document.body.clientWidth;
    return screenWidth < 550;
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


}

function changeInput() {
    var elInput = document.querySelector('[name="text-edit"]')
    var meme = getMeme()
    var txt = meme.lines[meme.selectedLineIdx].txt;
    elInput.value = txt;
}

function setTxt() {
    var meme = getMeme();
    var img = new Image();
    const textLines = meme.lines;

    // console.log('textLines', textLines);
    img.src = `meme-img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        textLines.forEach((line) => {
            drawText(line, line.txt, line.size, line.align, line.color, line.fill, line.font, line.x, line.y);
        })
    }
}

function drawText(line, txt, size, align, color, fill, font, x, y) {
    var txtWidth = gCtx.measureText(line.txt).width;
    setLineWidth(txtWidth, line);
    gCtx.lineWidth = 1;
    gCtx.font = ` ${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = fill;

    if (isMobile()) x = 120;

    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onChangeFontSize(condition) {
    // console.log('condition', condition);
    if (condition === 'increase') changeFontSize(+2);
    else changeFontSize(-2);
    renderCanvas()
}

function onChangePos(direction) {
    // console.log('direction', direction);
    if (direction === 'up') changePos(-10);
    else changePos(+10);
    renderCanvas()
}



function clearInput() {
    var elInput = document.querySelector('[name="text-edit"]')
    elInput.value = '';
}

function onAddLine() {
    creatLine();
    changeLine();
    markLine();
    clearInput();
}

function onChangeText() {
    changeTxt()
}

function onSwitchLine() {
    changeLine();
    markLine()
    setTxt();
    changeInput()
}

function onRemoveLine() {
    removeLine();
    clearInput();
    renderCanvas();
}

function drawRect() {
    var line = getLine()
    console.log('line', line.x);

    if (!line) return;

    gCtx.beginPath()
    gCtx.rect(line.x - 10, line.y - line.size, line.width + 20, line.size + 10);
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function markLine(width) {
    drawRect(width)
}

function onChangeAlign(align) {
    if (align === 'left') changeAlign(50)
    if (align === 'center') changeAlign(200)
    if (align === 'right') changeAlign(300)
    renderCanvas()
}

function onChangeTxtFont(font) {
    ChangeTxtFont(font);
    renderCanvas()
    setTxt()
}

function onChangeTxtStroke(color) {
    changeTxtStroke(color)
    renderCanvas()
}

function onChangeTxtColor(color) {
    changeTxtColor(color)
    renderCanvas()
}