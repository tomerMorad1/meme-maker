'use strict'

var gCanvas;
var gCtx;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;
var gIsChosen = false;

function onInIt() {
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    renderMeme()
    addEventListener('resize', resizeCanvas)
    addListeners()
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {


    gIsChosen = true;
    const pos = getEvPos(ev);

    if (!isLineClicked(pos)) return;
    setLineDrag(true);
    gStartPos = pos;
    document.querySelector('canvas').style.cursor = 'grabbing';
    changeInput();
    renderCanvas();
}

function onMove(ev) {
    if (!gIsChosen) return;

    const pos = getEvPos(ev);
    const line = getChosenLine(pos);
    if (!line) return;
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos;
        renderCanvas()
    }
}

function onUp() {
    gIsChosen = false;
    setLineDrag(false);
    document.querySelector('canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
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