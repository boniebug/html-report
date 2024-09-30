let allPokemonDetails = [];
function displayAllPokemons(data) {
    const pokemonContainer = document.getElementById('pokemon');
        const pokemonBlock = document.createElement('div');

        const name = document.createElement('h2');
        name.textContent = data.name;

        const id = document.createElement('p');
        id.textContent = `ID: ${data.id}`;

        const img = document.createElement('img');
        img.src = data.sprites.front_default;

        const type = document.createElement('p');
        let types = '';
        for (let i = 0; i < data.types.length; i++) {
            types += data.types[i].type.name;
            if (i < data.types.length - 1) {
               types += ', ';
            }
        }
            type.textContent = `Type: ${types}`;

      pokemonBlock.appendChild(name);
      pokemonBlock.appendChild(id);
      pokemonBlock.appendChild(img);
      pokemonBlock.appendChild(type);
      pokemonContainer.appendChild(pokemonBlock);
      pokemonBlock.addEventListener('click', () => displayPokemonDetails(data));
}

function displayPokemonDetails(data) {
    detailsContainer = document.createElement('div');
    detailsContainer .classname = 'pokemonDetails';
}
function fetching() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302")
.then((response) => response.json())
.then((data) => data.results)
.then((arr) => {
    allPokemonDetails = [];
    let count = 1;
    for (let i = 1; i <= arr.length; i++) {
        fetch(arr[i].url)
            .then((response) => response.json())
            .then((pokemonData) => {
                if (pokemonData.sprites && pokemonData.sprites.front_default) {
                    allPokemonDetails.push(pokemonData);
                    displayAllPokemons(pokemonData);
                }
            })
            console.log(arr.length);
            console.log(count);
            count++;
                if (count === arr.length) {
                    setTimeout(() => {
                        loading.style.display = 'none';
                        console.log("working loop");
                    }, 5000);

                }
    }
});
}

function searchPokemon() {
    const searchBar = document.getElementById('search');
    const findPokemon = searchBar.value;
    const pokemonContainer = document.getElementById('pokemon');
    pokemonContainer.innerHTML = '';

    for (let i = 0; i < allPokemonDetails.length; i++) {
        const pokemon = allPokemonDetails[i];
        const name = pokemon.name;
        const id = pokemon.id.toString();
        let types = '';

        if (pokemon.types) {
            for (let j = 0; j < pokemon.types.length; j++) {
                types += pokemon.types[j].type.name;
                if (j < pokemon.types.length - 1) {
                    types += ', ';
                }
            }
        }
        if (name.includes(findPokemon) || id.includes(findPokemon) || types.includes(findPokemon)) {
            displayAllPokemons(pokemon);
        }
    }
}

window.onload = fetching;