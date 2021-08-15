'use strict'

var gMeme;
var gXPos;

if (isMobile()) gXPos = 120;
else gXPos = 200;

gMeme = {
    selectedImgId: 6,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 30,
        width: 30,
        align: 'left',
        color: 'red',
        fill: 'white',
        font: 'impact',
        x: gXPos,
        y: 50

    }]
}
var gChosenLine = gMeme.lines[0];


function setLineWidth(width, line) {
    line.width = width;
}

function getLine() {

    return gMeme.lines[gMeme.selectedLineIdx];
}

function getTxt(val) {
    var currLineIdx = getCurrLineIndex();
    if (!gMeme.lines[gMeme.selectedLineIdx]) createLine();
    gMeme.lines[currLineIdx].txt = val;
}

function getImgById(img) {
    gMeme.selectedImgId = img;
    renderCanvas()
    toggleSections('meme');
}

function changeFontSize(num) {
    // console.log('num', num);
    gMeme.lines[gMeme.selectedLineIdx].size += +num;
}

function changePos(num) {
    gMeme.lines[gMeme.selectedLineIdx].y += +num;
}


function getMeme() {
    return gMeme;
}

function creatLine() {
    var yPos;

    if (isMobile()) {
        if (gMeme.lines.length === 0) yPos = 50;
        else if (gMeme.lines.length === 1) yPos = 140;
        else if (gMeme.lines.length === 2) yPos = 250;

    } else {
        if (gMeme.lines.length === 0) yPos = 50;
        else if (gMeme.lines.length === 1) yPos = 400;
        else if (gMeme.lines.length === 2) yPos = 250;
        else return;
    }

    gMeme.lines.push({
        txt: '',
        size: 30,
        width: 30,
        align: 'left',
        color: 'red',
        fill: 'white',
        font: 'impact',
        x: gXPos,
        y: yPos
    })
}

function changeLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {

        gMeme.selectedLineIdx = 0;
        return;
    }

    if (!gMeme.lines.length) return;
    gMeme.selectedLineIdx++;

}

function getCurrLineIndex() {
    return gMeme.selectedLineIdx;
}

function isMobile() {
    return window.innerWidth < 550;
}

function getCurrTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function removeLine() {
    if (!gMeme.lines.length) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (!gMeme.selectedLineIdx) {
        creatLine()
        return;
    }
    gMeme.selectedLineIdx--
}

function changeAlign(px) {
    gMeme.lines[gMeme.selectedLineIdx].x = px
}

function ChangeTxtFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function changeTxtStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color;
}

function isLineClicked(clickedPos) {
    const clickedLine = getChosenLine(clickedPos);
    gChosenLine = clickedLine;
    return clickedLine;
}


function getChosenLine(clickedPos) {
    if (gMeme.lines.length === 1) {
        gChosenLine = gMeme.lines[0];
        return gChosenLine;
    }

    const lines = getLines();
    const clickedLine = lines.find((line) => {
        const lineX = line.x + line.width;
        const lineY = line.y - line.size;
        const lineArea = { x: lineX, y: lineY };
        return (clickedPos.x >= line.x - 10 && clickedPos.x <= lineArea.x + 15 &&
            clickedPos.y <= line.y + 20 && clickedPos.y >= lineArea.y - 5);
    })
    gChosenLine = clickedLine;
    return gChosenLine;
}

function getLines() {
    return gMeme.lines;
}

function setLineDrag(isDrag) {
    if (!gChosenLine) return;
    gChosenLine.isDrag = isDrag
}

function moveLine(dx, dy) {
    const line = gChosenLine;
    line.x += dx
    line.y += dy
}