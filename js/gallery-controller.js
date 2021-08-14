'use strict'

function onInIt() {
    renderCanvas()
    renderMeme()
    addEventListener('resize', resizeCanvas)
}

function toggleSections(section) {
    var elGallery = document.querySelector('.meme-container')
    var elMeme = document.querySelector('main')

    if (section === 'meme') {
        elGallery.classList.add('none');
        elMeme.classList.remove('none');
        elGallery.classList.remove('grid');
    } else {
        elMeme.classList.add('none');
        elGallery.classList.remove('none');
        elGallery.classList.add('grid');

    }
    resizeCanvas();
    renderCanvas();
}



function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function toggleModal() {
    document.body.classList.toggle('modal-open');
    document.body.classList.remove('menu-open');

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