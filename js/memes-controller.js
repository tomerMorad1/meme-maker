'use strict'

var gCanvas;
var gCtx;

function onInIt() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderMeme()
    addEventListener('resize', resizeCanvas)

}

function renderCanvas() {
    gCtx.save();
    drawImg();
    setTxt();
    changeInput();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');

    gCanvas.width = elContainer.offsetWidth - 20
    gCanvas.height = elContainer.offsetWidth - 20

    drawImg();
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

    img.src = `meme-img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        textLines.forEach((line) => {
            markLine();
            drawText(line, line.txt, line.size, line.align, line.color, line.fill, line.font, line.x, line.y);
        })
    }
}

function drawText(line, txt, size, align, color, fill, font, x, y) {
    var txtWidth = gCtx.measureText(line.txt).width + 10;
    setLineWidth(txtWidth, line);
    gCtx.lineWidth = 1;
    gCtx.font = ` ${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.strokeStyle = color;
    gCtx.fillStyle = fill;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onChangeFontSize(condition) {
    if (condition === 'increase') changeFontSize(+2);
    else changeFontSize(-2);
    renderCanvas()


}

function onChangePos(direction) {
    if (direction === 'up') changePos(-10);
    else changePos(+10);
    renderCanvas()
}

function clearInput() {
    var elInput = document.querySelector('[name="text-edit"]')
    elInput.value = '';
    elInput.focus();
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
    renderCanvas()
    changeInput()
}

function onRemoveLine() {
    removeLine();
    clearInput();
    renderCanvas();
}

function markLine() {
    const line = getLine()
    if (!line) return;
    // console.log('line', line);

    gCtx.lineWidth = 3;
    gCtx.beginPath()
    gCtx.rect(line.x - 10, line.y - line.size, line.width + 20, line.size + 10);
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}



function onChangeAlign(align) {
    if (isMobile()) {
        if (align === 'left') changeAlign(50)
        if (align === 'center') changeAlign(120)
        if (align === 'right') changeAlign(200)
    } else {
        if (align === 'left') changeAlign(50)
        if (align === 'center') changeAlign(200)
        if (align === 'right') changeAlign(300)
    }
    renderCanvas();
}

function onChangeTxtFont(font) {
    ChangeTxtFont(font);
    renderCanvas()
}

function onChangeTxtStroke(color) {
    changeTxtStroke(color)
    renderCanvas()
}

function onChangeTxtColor(color) {
    changeTxtColor(color)
    renderCanvas()
}