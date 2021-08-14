'use strict'

var gMeme;
var gXPos;



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
if (isMobile()) gXPos = 120;
else gXPos = 200;

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
    toggleSections();
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
    // var xPos;

    if (isMobile()) {
        // console.log('im small');
        if (gMeme.lines.length === 0) {
            yPos = 50;
        } else if (gMeme.lines.length === 1) {
            yPos = 120;
        } else if (gMeme.lines.length === 2) {
            yPos = 250;
        }
        gXPos = 120;

    } else {
        if (gMeme.lines.length === 0) yPos = 50;
        else if (gMeme.lines.length === 1) yPos = 400;
        else if (gMeme.lines.length === 2) yPos = 250;
        else return;
        gXPos = 200;
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