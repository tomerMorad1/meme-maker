'use strict'

var gMeme;
gMeme = {

    selectedImgId: 6,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 30,
        width: 30,
        align: 'center',
        color: 'red',
        fill: 'white',
        font: 'impact',
        x: 250,
        y: 50

    }]
}

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

    if (gMeme.lines.length === 0) yPos = 50;
    else if (gMeme.lines.length === 1) yPos = 400;
    else if (gMeme.lines.length === 2) yPos = 250;
    else return;

    gMeme.lines.push({
        txt: '',
        size: 30,
        width: 30,
        align: 'center',
        color: 'red',
        fill: 'white',
        font: 'impact',
        x: 250,
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