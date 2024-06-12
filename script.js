const poke_container = document.querySelector('.poke-container');
const search = document.querySelector('.search');
const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');

const pokemon_count = 151;


const bg_color = {
    grass: "#8BD369",
    water: "#3399FF",
    fire: "#FF603F",
    ice: "#66ccff",
    electric: "#FFd34d",
    ground: "#E2C56A",
    poison: "#9966FF",
    rock: "#999999",
    flying: "#9aa8fa",
    psychic: "#FF6ea4",
    bug: "#aabb22",
    normal: "#aaaa99",
    dragon: "#7766ee",
    fighting: "#c56e5c",
    fairy: "#f1a8ec",
}

searchBtn.addEventListener('click', () => {
    search.classList.toggle('active')
  })

  searchInput.addEventListener('input', (e) => {
    //console.log(searchInput.value)
    const searchValue = searchInput.value.toLowerCase()
    const pokemonNames = document.querySelectorAll('.poke-name')
  
    pokemonNames.forEach((pokemonName) => {
      pokemonName.parentElement.parentElement.style.display = 'block'
  
      if (!pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
        pokemonName.parentElement.parentElement.style.display = 'none'
      }
    })
  })
  




const fetchPokemons = async () => {
    for(let i=1; i<pokemon_count;i++) {
        await getPokemon(i)
}
}
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
    console.log(data)
}
const createPokemonCard = (pokemon) => {
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")
    const pokemonId = pokemon.id.toString().padStart(3, '0')
    const pokemonType = pokemon.types[0].type.name
    const pokemonBg= bg_color[pokemonType]
    pokemonDiv.style.backgroundColor = `${pokemonBg}`

    const pokemonDivInnerHTML = `
    
    <div class="image-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="First Pokemon">
</div>
<div class="poke-info">
    <span class="poke-id">${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
        <small class="poke-exp">
            <i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp
        </small>
        <small class="poke-weight">
            <i class="fa-solid fa-weight-scale"></i> ${pokemon.weight} kg
        </small>
    </div>
    <div class="poke-type">
        <i class="fa-brands fa-uncharted"></i> ${pokemonType}
    </div>
</div>

    `


    pokemonDiv.innerHTML= pokemonDivInnerHTML
    poke_container.appendChild(pokemonDiv)
}

fetchPokemons()