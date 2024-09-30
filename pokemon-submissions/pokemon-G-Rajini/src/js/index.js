'use strict';

const fetchPokemonApi = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1005');
        const data = await response.json();
        return pokemonsParse(data.results);
    } catch (error) {
        console.log('fetching error:', error);
    }
};

const pokemonsParse = async (data) => {
    const pokemonArray = [];
    for (const pokemon of data) {
        try {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            console.log(pokemonData);
            const pokemonInfo = {
                id: pokemonData.id, name: pokemonData.name, type: pokemonData.types[0].type.name,
                image: pokemonData.sprites.other.home.front_shiny, ability: pokemonData.abilities[0].ability.name,
                move: pokemonData.moves[0].move.name, statistics: pokemonData.stats[0].stat.name,
                height: pokemonData.height, weight: pokemonData.weight
            };
            // console.log(pokemonInfo);
            pokemonArray.push(pokemonInfo);
        } catch (error) {
            console.log('error', error);
        }
    }
    return pokemonArray;
};

const createDiv = (pokemon) => {
    const pokemonId = document.createElement('p');
    pokemonId.textContent = `Id:${pokemon.id}`;
    const pokemonType = document.createElement('p');
    pokemonType.textContent = `Type:${pokemon.type}`;
    const pokemonImage = document.createElement('img');
    pokemonImage.width = 100;
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    const moreDetails = document.createElement('button');
    moreDetails.textContent = 'Details';
    moreDetails.className = 'moreDetailsButton';
    return appendedPokemonDetais(pokemonId, pokemonType, pokemonImage, pokemonName, moreDetails, pokemon);
};

const createMoreInfo = (pokemon, pokemonDiv, moreDetails, outerDiv) => {
    const pokemonHeight = document.createElement('p');
    pokemonHeight.textContent = `Height:${pokemon.height}`;
    const pokemonWeight = document.createElement('p');
    pokemonWeight.textContent = `Weight:${pokemon.weight}`;
    const pokemonMoves = document.createElement('p');
    pokemonMoves.textContent = `Moves:${pokemon.move}`;
    const pokemonStatistics = document.createElement('p');
    pokemonStatistics.textContent = `Statistics:${pokemon.stat}`;
    const pokemonAbilities = document.createElement('p');
    pokemonAbilities.textContent = `Ability:${pokemon.ability}`;
    morePokemonDetailsAppended(pokemonDiv, moreDetails, outerDiv, pokemonHeight, pokemonWeight, pokemonMoves, pokemonStatistics, pokemonAbilities)
};

const homeButton = (pokemonArray) => {
    const homeButton = document.getElementById('homeButton');
    homeButton.addEventListener('click', () => {
        outerDiv.innerHTML = '';
        displayPokemonDetails(pokemonArray);
    });
};

const morePokemonDetailsAppended = (pokemonDiv, moreDetails, outerDiv, pokemonHeight, pokemonWeight, pokemonMoves, pokemonStatistics, pokemonAbilities) => {
    moreDetails.addEventListener('click', () => {
        outerDiv.classList.add('moreDetails');
        outerDiv.innerHTML = '';
        pokemonDiv.appendChild(pokemonHeight);
        pokemonDiv.appendChild(pokemonWeight);
        pokemonDiv.appendChild(pokemonMoves);
        pokemonDiv.appendChild(pokemonStatistics);
        pokemonDiv.appendChild(pokemonAbilities);
        moreDetails.style.display = 'none';
        outerDiv.appendChild(pokemonDiv);
        homeButton();
    });
};

const appendedPokemonDetais = (pokemonId, pokemonType, pokemonImage, pokemonName, moreDetails, pokemon) => {
    const outerDiv = document.getElementById('pokemonImages');
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('innerDiv');
    pokemonDiv.appendChild(pokemonId);
    pokemonDiv.appendChild(pokemonType);
    pokemonDiv.appendChild(pokemonImage);
    pokemonDiv.appendChild(pokemonName);
    pokemonDiv.appendChild(moreDetails);
    outerDiv.appendChild(pokemonDiv);
    createMoreInfo(pokemon, pokemonDiv, moreDetails, outerDiv);
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
    homeButton(pokemonArray);
};

