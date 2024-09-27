window.onload = () => {
    loadingMessage();
    pokemonFetch();
    search();
};

const loadingMessage = () => {
    const main = document.getElementById('main-container');
    const loadingMessage = document.createElement('h2');
    loadingMessage.id = 'loading-message';
    loadingMessage.innerText = 'Loading..';
    main.appendChild(loadingMessage);
};

const removeLoadingMessage = () => {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
};

const pokemonFetch = async () => {
    const rootUrl = 'https://pokeapi.co/api/v2/pokemon';
    try {
        const response = await fetch(`${rootUrl}?limit=100000&offset=0`);
        const pokemons = await response.json();
        const totalPokemons = pokemons.results.length;

        removeLoadingMessage();

        for (let i = 0; i < totalPokemons; i++) {
            await pokemonDataFetch(pokemons.results[i].url);
        }
    } catch (error) {
        console.error(error);
    }
};

const createDivAndItsElementsAppendToMain = (src, name, id, type) => {
    const main = document.getElementById('main-container');
    const div = document.createElement('div');
    div.className = 'pokemon-container';

    const img = createImage(src);
    const pokemonName = createDetail(name, 'pokemon-name', 'h1');
    const pokemonId = createDetail(`Id: ${id}`, 'pokemon-id');
    const pokemonType = createDetail(`Type: ${type}`, 'pokemon-type');

    div.append(img, pokemonName, pokemonId, pokemonType);
    main.appendChild(div);
};

const createImage = (src) => {
    const img = document.createElement('img');
    img.src = src || 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png';
    img.className = 'pokemon-image';
    return img;
};

const createDetail = (info, className, tag = 'p') => {
    const detail = document.createElement(tag);
    detail.innerText = info;
    detail.className = className;
    return detail;
};

const pokemonDataFetch = async (pokemonUrl) => {
    try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();
        const pokemonName = pokemonData.name;
        const pokemonId = pokemonData.id;
        const pokemonType = pokemonData.types.map(item => item.type.name).join(', ');
        const pokemonImage = pokemonData.sprites.front_default;
        createDivAndItsElementsAppendToMain(pokemonImage, pokemonName, pokemonId, pokemonType);
    } catch (error) {
        console.error(error);
    }
};

const search = () => {
    const searchByElement = document.getElementById('searchBy');
    const searchInput = document.getElementById('searchItem');
    searchInput.addEventListener('input', passElementsToSearch);
    searchByElement.addEventListener('change', passElementsToSearch);
};

const passElementsToSearch = () => {
    const searchByElement = document.getElementById('searchBy');
    const searchInput = document.getElementById('searchItem');
    const searchBy = searchByElement.value;
    const searchText = searchInput.value.toLowerCase();
    filterPokemons(searchBy, searchText);
};

const searchDisplay = (container, searchBy, matchesName, matchesId, matchesType) => {
    if (searchBy === 'all') {
        container.style.display = (matchesName || matchesId || matchesType) ? 'block' : 'none';
    } else if (searchBy === 'name') {
        container.style.display = matchesName ? 'block' : 'none';
    } else if (searchBy === 'id') {
        container.style.display = matchesId ? 'block' : 'none';
    } else if (searchBy === 'type') {
        container.style.display = matchesType ? 'block' : 'none';
    }
};

const filterPokemons = async (searchBy, searchText) => {
    const pokemonContainers = document.getElementsByClassName('pokemon-container');

    for (let i = 0; i < pokemonContainers.length; i++) {
        const container = pokemonContainers[i];
        const { nameValue, idValue, typeValue } = await pokemonSearchDetails(container);

        const matchesName = nameValue.includes(searchText);
        const matchesId = idValue.includes(searchText);
        const matchesType = typeValue.includes(searchText);

        searchDisplay(container, searchBy, matchesName, matchesId, matchesType);
    }
};

const pokemonSearchDetails = async (container) => {
    const nameElement = container.getElementsByClassName('pokemon-name')[0];
    const idElement = container.getElementsByClassName('pokemon-id')[0];
    const typeElement = container.getElementsByClassName('pokemon-type')[0];

    const nameValue = nameElement.innerText.toLowerCase();
    const idValue = idElement.innerText.split(': ')[1].toLowerCase();
    const typeValue = typeElement.innerText.split(': ')[1].toLowerCase();

    return { nameValue, idValue, typeValue };
};


