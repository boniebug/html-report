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
            const weakness = await fetchWeakness(pokemonData.types[0].type.url);
            const ability = accessElementsFromArray(pokemonData.abilities, 'ability', pokemonData.abilities.length);
            const move = accessElementsFromArray(pokemonData.moves, 'move', 4);
            const statistics = accessElementsFromArray(pokemonData.stats, 'stat', 3);
            const pokemonInfo = {
                id: pokemonData.id, name: pokemonData.name, type: pokemonData.types[0].type.name,
                image: pokemonData.sprites.other.home.front_shiny, ability, move, statistics,
                height: pokemonData.height, weight: pokemonData.weight, weakness
            }
            pokemonArray.push(pokemonInfo);
        } catch (error) {
            console.log('error', error);
        }
    }
    return pokemonArray;
};

const fetchWeakness = async (url) => {
    const response = await fetch(url);
    const parseData = await response.json(response);
    const data = parseData.damage_relations.double_damage_from;
    const array = [];
    for (let index = 0; index < data.length; index++) {
        array.push(data[index].name);
    }
    return array;
};

const accessElementsFromArray = (array, key, limit) => {
    const result = [];
    for (let index = 0; index < limit; index++) {
        result.push(array[index][key].name);
    }
    return result;
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
    pokemonStatistics.textContent = `Statistics:${pokemon.statistics}`;
    const pokemonAbilities = document.createElement('p');
    pokemonAbilities.textContent = `Ability:${pokemon.ability}`;
    const closeButton = document.createElement('button');
    const pokemonWeakness = document.createElement('p');
    pokemonWeakness.textContent = `Weakness:${pokemon.weakness}`;
    closeButton.className = 'closeButton';
    closeButton.innerText = 'Close';
    moreDetails.addEventListener('click', () => {
        const newPokemonDiv = appendMoredInfo(pokemonDiv, pokemonHeight, pokemonWeight, pokemonMoves, pokemonStatistics, pokemonAbilities, pokemonWeakness);
        pokemonDetailsDisplay(newPokemonDiv, outerDiv, closeButton);
    })

};

const appendMoredInfo = (pokemonDiv, pokemonHeight, pokemonWeight, pokemonMoves, pokemonStatistics, pokemonAbilities, pokemonWeakness) => {
    pokemonDiv.appendChild(pokemonHeight);
    pokemonDiv.appendChild(pokemonWeight);
    pokemonDiv.appendChild(pokemonMoves);
    pokemonDiv.appendChild(pokemonStatistics);
    pokemonDiv.appendChild(pokemonAbilities);
    pokemonDiv.appendChild(pokemonWeakness);
    return pokemonDiv;
};

const pokemonDetailsDisplay = (newPokemonDiv, outerDiv, closeButton) => {
    outerDiv.style.display = 'none';
    newPokemonDiv.appendChild(closeButton);
    const anotherOuterDiv = document.createElement('div');
    anotherOuterDiv.className = 'moreDetailsOuterDiv';
    newPokemonDiv.classList.add('pokemonInnerDiv');
    anotherOuterDiv.appendChild(newPokemonDiv);
    document.body.appendChild(anotherOuterDiv);
    closeButton.addEventListener('click', () => {
        anotherOuterDiv.style.display = 'none';
        outerDiv.style.display = 'flex';
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
};
