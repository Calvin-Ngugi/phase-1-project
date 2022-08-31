document.addEventListener('DOMContentLoaded', () => {
    loadToCarousel();
    loadDetailsById(1);
    showSlides()
})

function loadToCarousel() {
    fetch(`https://api.jikan.moe/v4/anime/20/pictures`)
        .then(res => res.json())
        .then(animePic => console.log(animePic))
}

function loadDetailsById(anime) {
    fetch(`https://api.jikan.moe/v4/anime/20/full`)
        .then(res => res.json())
        .then(animeInfo => console.log(animeInfo))
}

let slideIndex = 1;
showSlides(slideIndex);

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 0 }
    setTimeout(showSlides, 4000); // Change image every 2 seconds
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}