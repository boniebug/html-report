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
}
function fetching() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302")
.then((response) => response.json())
.then((data) => data.results)
.then((arr) => {
    allPokemonDetails = [];
    for (let i = 0; i < arr.length; i++) {
        fetch(arr[i].url)
            .then((response) => response.json())
            .then((pokemonData) => {
                allPokemonDetails.push(pokemonData);
                displayAllPokemons(pokemonData);
            });
    }
    loading.style.display = 'none';
});
}
function searchPokemon() {
    const searchInput = document.getElementById('search').value;
    const foundPokemon = [];
    
    allPokemonDetails.forEach(pokemon => {
        if (pokemon.name.includes(searchInput) ||
            pokemon.id.toString().includes(searchInput)) {
            foundPokemon.push(pokemon);
        }
        
        pokemon.types.forEach(typeInfo => {
            if (typeInfo.type.name.includes(searchInput)) {
                foundPokemon.push(pokemon);
            }
        });
    });

    document.getElementById('pokemon').innerText = '';
    if (foundPokemon.length > 0) {
        foundPokemon.forEach(pokemon =>
         displayAllPokemons(pokemon));
    }
}

window.onload = fetching;