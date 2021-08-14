'use strict'

function onInIt() {

    renderCanvas()
    renderMeme()

    addEventListener('resize', resizeCanvas)

}


function toggleSections() {
    var elContainer = document.querySelector('.meme-container')
    var elMain = document.querySelector('main')

    elContainer.classList.toggle('none');
    elContainer.classList.toggle('grid');
    elMain.classList.toggle('none');

    resizeCanvas();
    renderCanvas();
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderMeme() {
    var imgHTML = ''
    for (var i = 1; i <= 18; i++) {
        imgHTML += `<div class="meme meme${i}" id=${i} onclick="onMemeSelect(this.id)" > 
        <img src="meme-img/${i}.jpg" alt=""> </div> `
    }

    var elContainer = document.querySelector('.meme-container')
    elContainer.innerHTML = imgHTML;

}

function onMemeSelect(img) {
    getImgById(img)
    resizeCanvas();

}