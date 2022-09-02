document.addEventListener('DOMContentLoaded', () => {
    loadDetailsById();
    loadListToPage();
    addAnime();
})

function loadDetailsById() {
    fetch(`https://api.jikan.moe/v4/random/anime`)
        .then(res => res.json())
        .then(animeInfo => {
            document.getElementById('anime-name').innerHTML = animeInfo.data.title_english
            document.getElementById('anime-japanese-name').innerHTML = animeInfo.data.title_japanese
            document.getElementById('anime-image').src = animeInfo.data.images.jpg.large_image_url
            document.getElementById('anime-rating').innerHTML = animeInfo.data.rating
            document.getElementById('anime-synopsis').innerHTML = animeInfo.data.synopsis
            document.getElementById('anime-favorites').innerHTML = `Number of likes: ${animeInfo.data.favorites}`
            document.getElementById('anime-status').innerHTML = animeInfo.data.status
            document.getElementById('trailer').src = animeInfo.data.trailer.embed_url
        })
}

function loadListToPage() {
    fetch(`https://api.jikan.moe/v4/anime`)
        .then(res => res.json())
        .then(animeData => {
            //console.log(animeData);
            animeData.data.forEach(animeCard => renderCards(animeCard))
        })
}

function renderCards(animeCard) {
    let card = document.createElement('li')
    card.className = 'anime-card'
    card.id = animeCard.mal_id
    card.innerHTML = `
    <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
    <div class="card">
    <img src="${animeCard.images.jpg.image_url}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${animeCard.title_english}</h5>
      <h5 class="card-title japanese">${animeCard.title_japanese}</h5>
      <p class="card-text">${animeCard.synopsis}</p>
      <p class="card-text"><small class="text-muted">${animeCard.status}</small></p>
      <p id="count" class="card-text">This anime has ${animeCard.favorites} likes</p>
      <div class = "buttons">
      <button type="button" class="btn btn-success" id = "like"> Like </button>
        <button type="button" class="btn btn-danger" id = "not-interested"> Not Interested </button>
        </div>
        </div>
        </div>
    </div>
  </div>
    `
    card.querySelector('#like').addEventListener('click', () =>{
        animeCard.favorites += 1
        card.querySelector('#count').textContent = `This show has ${animeCard.favorites} likes`
    })
    card.querySelector('#not-interested').addEventListener('click', () => {
        card.remove()
    })
    document.getElementById('anime-list').appendChild(card)
}

function addAnime(){
    document.querySelector('.add-anime-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        let form = e.target;
        document.querySelector('#review-list').innerHTML += `<li class="paragraph">${form.review.value}</li>`;
        form.reset();
    })
}