'use strict';

const fetchPokemonApi = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60');
        const data = await response.json();
        const pokemonArray = data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const pokemonInfo = {
                id: pokemonData.id, name: pokemonData.name, type: pokemonData.types[0].type.name,
                image: pokemonData.sprites.front_default
            };
            return pokemonInfo;
        });
        const pokemonDetails = await Promise.all(pokemonArray);
        return pokemonDetails;
    } catch (error) {
        console.log('fetching error:', error);
    }
};

const createDiv = (pokemon) => {
    const pokemonId = document.createElement('p');
    pokemonId.textContent = pokemon.id;
    const pokemonType = document.createElement('p');
    pokemonType.textContent = pokemon.type;
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    return appendedPokemonDetais(pokemonId, pokemonType, pokemonImage, pokemonName);
};

const appendedPokemonDetais = (pokemonId, pokemonType, pokemonImage, pokemonName) => {
    const outerDiv = document.getElementById('pokemonImages');
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('innerDiv');
    pokemonDiv.appendChild(pokemonId);
    pokemonDiv.appendChild(pokemonType);
    pokemonDiv.appendChild(pokemonImage);
    pokemonDiv.appendChild(pokemonName);
    outerDiv.appendChild(pokemonDiv);
};

const renderPokemonApi = async () => {
    const pokemonDetails = await fetchPokemonApi();
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'none';
    return pokemonDetails;
};

const displayPokemonDetails = (pokemonDetails) => {
    for (let index = 0; index < pokemonDetails.length; index++) {
        createDiv(pokemonDetails[index]);
    }
};

const searcArray = (pokemonArray, searchValue) => {
    const outerDiv = document.getElementById('pokemonImages');
    const searchData = searchItems(pokemonArray, searchValue);
    console.log(searchData);
    outerDiv.innerHTML = '';
    displayPokemonDetails(searchData);
};

const searchItems = (pokemonArray, searchInput) => {
    const outerDiv = document.getElementById('pokemonImages');
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        outerDiv.innerHTML = '';
        displayPokemonDetails(pokemonArray);
    });
    return pokemonArray.filter(({ id, type, name }) => {
        id = id.toString();
        type = type.toLowerCase();
        name = name.toLowerCase();
        return id.includes(searchInput) || type.includes(searchInput) || name.includes(searchInput);
    });
};

window.onload = async () => {
    const pokemonArray = await renderPokemonApi();
    displayPokemonDetails(pokemonArray);
    const search = document.getElementById('search');
    search.addEventListener('input', () => searcArray(pokemonArray, search.value.toLowerCase()));
};
