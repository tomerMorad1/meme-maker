'use strict'

function onInIt() {

    renderCanvas()
    renderMeme()
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
}