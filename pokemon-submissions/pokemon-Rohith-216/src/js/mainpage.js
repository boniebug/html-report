'use strict';

let isPageLoading = true;

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

const appendChilderns = (names, id, image, types, pokemonDIv) => {
    const pokemonsContainer = document.getElementById('mainpage');
    pokemonDIv.style.textAlign = 'center';
    pokemonDIv.appendChild(names);
    pokemonDIv.appendChild(id);
    pokemonDIv.appendChild(image);
    pokemonDIv.appendChild(types);
    pokemonsContainer.appendChild(pokemonDIv);
}

const displayData = (data, loadingpage) => {
    loadingpage.innerHTML = '';
    loadingpage.remove();
    const pokemonDIv = document.createElement('div');
    pokemonDIv.className = 'pokemon';
    const names = document.createElement('h2');
    names.innerText = `${data.name}`;
    const id = document.createElement('p');
    id.innerText = `ID: ${data.id}`;
    const image = document.createElement('img');
    image.src = `${data.sprites.front_default}`;
    const types = document.createElement('p');
    types.innerText = `type: ${data.types.map(type => type.type.name).join(', ')}`;
    appendChilderns(names, id, image, types, pokemonDIv);
};

const fetchDetails = async (url, loadingpage) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayData(data, loadingpage);
    } catch (error) {
        console.log(error);
    }
};

const getPokemonDetails = (pokemons, loadingpage) => {
    pokemons.forEach(pokemon => {
        fetchDetails(pokemon.url, loadingpage);
    });
};

const renderPokemons = async (loadingpage) => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=359&offset=0');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data, loadingpage);
    } catch (error) {
        console.log('failed to render', error);
    }
};

window.onload = () => {
    const pokemonsContainer = document.querySelector('#mainpage');
    const loadingpage = document.createElement('div');
    loadingpage.innerHTML = 'Loading...';
    pokemonsContainer.appendChild(loadingpage);
    setTimeout(() => {
        renderPokemons(loadingpage);
        isPageLoading = false;
        removePopup();
    }, 5000);
    searchFunctioning();
};