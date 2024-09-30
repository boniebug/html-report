'use strict';

let isPageLoading = true;

const displayPickedOne = () => {
    const container = document.getElementsByClassName('pokemon');
    for (let index = 0; index < container.length; index++) {
        const section = container[index]
        section.addEventListener('click', () => {
            const detailsContainer = document.getElementsByClassName('moreDetails');
            for (let index = 0; index < detailsContainer.length; index++) {
                if (section.querySelector('p').innerText === detailsContainer[index].querySelector('p').innerText) {
                    detailsContainer.style.display = 'block';
                } 
            }
        });
    }
};

const removePopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.innerText = '';
        document.body.removeChild(popup);
    }
    return;
};

const popupAlert = () => {
    const popUp = document.createElement('h2');
    popUp.innerText = 'page is loading please wait';
    popUp.id = 'popup';
    popUp.style.textAlign = 'center';
    document.body.appendChild(popUp);
    setTimeout(() => { removePopup(); }, 1000);
};

const searchAlert = () => {
    const container = document.getElementsByClassName('pokemon');
    for (let index = 0; index < container.length; index++) {
        const separateDiv = container[index];
        if (separateDiv.innerText.toLowerCase().includes(search.value)) {
            separateDiv.style.display = 'block';
        } else {
            separateDiv.style.display = 'none';
        }
    }
};

const searchFunctioning = () => {
    const search = document.querySelector('#search');
    search.addEventListener('input', () => {
        (isPageLoading) ? popupAlert() : searchAlert();
    });
};

const appendChilderns = (names, id, image, typeArray, pokemonDIv) => {
    names.style.margin = '0';
    id.style.margin = '0';
    typeArray.style.margin = '0';
    image.style.margin = '0';
    const pokemonsContainer = document.getElementById('mainpage');
    pokemonDIv.style.textAlign = 'center';
    pokemonDIv.appendChild(names);
    pokemonDIv.appendChild(id);
    pokemonDIv.appendChild(image);
    pokemonDIv.appendChild(typeArray);
    pokemonsContainer.appendChild(pokemonDIv);
};

const removeLoader = () => {
    const pokemonsContainer = document.getElementById('mainpage');
    pokemonsContainer.innerText = '';
    pokemonsContainer.style.fontSize = '15px';
    return;
};

const renderMoreDetails = (names, id, image, typeArray, height, weight, abilitiesArray, movesArray, staticies) => {
    const extraDetails = document.createElement('div');
    extraDetails.className = 'moreDetails';
    extraDetails.appendChild(names);
    extraDetails.appendChild(id);
    extraDetails.appendChild(image);
    extraDetails.appendChild(typeArray);
    extraDetails.appendChild(height);
    extraDetails.appendChild(weight);
    extraDetails.appendChild(abilitiesArray);
    extraDetails.appendChild(movesArray);
    extraDetails.appendChild(staticies);
    const container = document.getElementById('mainpage');
    container.appendChild(extraDetails);
    extraDetails.style.display = 'none';
};

const getMoreDetails = (data) => {
    const pokemonDIv = document.createElement('div');
    pokemonDIv.className = 'pokemon';
    const names = document.createElement('h2');
    names.innerText = `${data.name}`;
    const id = document.createElement('p');
    id.innerText = `ID: ${data.id}`;
    const image = document.createElement('img');
    image.style.height = '100px';
    image.style.aspectRatio = '1';
    image.src = `${data.sprites.other.home.front_default}`;
    const typeArray = document.createElement('p');
    const typesContainer = [];
    data.types.forEach(type => typesContainer.push(type.type.name));
    typeArray.innerText = `type: ${typesContainer.join(', ')}`;
    const height = document.createElement('p');
    height.innerText = `Height: ${data.height}`;
    const weight = document.createElement('p');
    weight.innerText = `Weight: ${data.weight}`;
    const abilitiesArray = document.createElement('p');
    const abilities = [];
    if (data.abilities) {
        for (let i = 0; i < data.abilities.length; i++) {
            const abilityObj = data.abilities[i];
            if (abilityObj.ability && abilityObj.ability.name) {
                abilities.push(abilityObj.ability.name);
            }
        }
    }
    abilitiesArray.innerText = `Abilities: ${abilities.join(', ')}`;
    const movesArray = document.createElement('p');
    const moves = [];
    if (data.moves) {
        for (let i = 0; i < data.moves.length; i++) {
            const moveObj = data.moves[i];
            if (moveObj.move && moveObj.move.name) {
                moves.push(moveObj.move.name);
            }
        }
    }
    movesArray.innerText = `Moves: ${moves.length ? moves.join(', ') : 'None'}`;
    const statsArray = document.createElement('p');
    const stats = [];
    if (data.stats) {
        for (let i = 0; i < data.stats.length; i++) {
            const statObj = data.stats[i];
            if (statObj.stat && statObj.stat.name && statObj.base_stat !== undefined) {
                stats.push(`${statObj.stat.name}: ${statObj.base_stat}`);
            }
        }
    }
    statsArray.innerText = `Stats: ${stats.join(', ')}`;
    renderMoreDetails(names, id, image, typeArray, height, weight, abilitiesArray, movesArray, statsArray);
}

const displayData = (data) => {
    const pokemonDIv = document.createElement('div');
    pokemonDIv.className = 'pokemon';
    const names = document.createElement('h2');
    names.innerText = `${data.name}`;
    const id = document.createElement('p');
    id.innerText = `ID: ${data.id}`;
    const image = document.createElement('img');
    image.style.height = '100px';
    image.style.aspectRatio = '1';
    image.src = `${data.sprites.other.home.front_default}`;
    const typeArray = document.createElement('p');
    const typesContainer = [];
    data.types.forEach(type => typesContainer.push(type.type.name));
    typeArray.innerText = `type: ${typesContainer.join(', ')}`;
    appendChilderns(names, id, image, typeArray, pokemonDIv);
    return;
};

const fetchDetails = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayData(data);
        getMoreDetails(data);
    } catch (error) {
        console.log(error);
    }
};

const getPokemonDetails = (pokemons) => {
    pokemons.forEach(pokemon => {
        fetchDetails(pokemon.url);
    });
    removeLoader();
};

const renderPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data);
    } catch (error) {
        console.log('failed to render', error);
    }
};

window.onload = () => {
    const pokemonsContainer = document.querySelector('#mainpage');
    pokemonsContainer.innerText = 'Loading....';
    pokemonsContainer.style.fontSize = '40px';
    pokemonsContainer.style.textAlign = 'center';
    setTimeout(() => {
        renderPokemons();
        isPageLoading = false;
        removePopup();
    }, 5000);
    searchFunctioning();
    displayPickedOne();
};