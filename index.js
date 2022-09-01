document.addEventListener('DOMContentLoaded', () => {
    loadDetailsById();
    loadListToPage();
})

function loadDetailsById() {
    fetch(`https://api.jikan.moe/v4/random/anime`)
        .then(res => res.json())
        .then(animeInfo => {
            document.getElementById('anime-name').innerHTML = animeInfo.data.title_english
            document.getElementById('anime-japanese-name').innerHTML = animeInfo.data.title_japanese
            document.getElementById('anime-image').src = animeInfo.data.images.jpg.large_image_url
            document.getElementById('trailer').src = animeInfo.data.trailer.youtube_id
            document.getElementById('anime-rating').innerHTML = animeInfo.data.rating
            document.getElementById('anime-synopsis').innerHTML = animeInfo.data.synopsis
            document.getElementById('anime-favorites').innerHTML = `Number of likes: ${animeInfo.data.favorites}`
            document.getElementById('anime-status').innerHTML = animeInfo.data.status
        })
}

function loadListToPage() {
    fetch(`https://api.jikan.moe/v4/anime`)
        .then(res => res.json())
        .then(animeData => {
            console.log(animeData);
            document.getElementById('anime-list').innerHTML = animeData.data
            .map(
                anime => 
                `<a href="loadAnimeDetails${anime.mal_id}">${anime.name}</a>`
            ).join('');
})
}