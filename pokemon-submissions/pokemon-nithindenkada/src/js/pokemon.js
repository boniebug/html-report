const fetchPokemonDetails = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
        const parsedResponse = await response.json();
        const data = parsedResponse.results;
        // console.log(data);
        getPokemonDetailsAndLoader(data);
    } catch (error) {
        console.log('failed to render', error);
    }
};

const getPokemonDetailsAndLoader = (pokemonData) => {
    // console.log(pokemonData);
    const pokemonsContainer = document.getElementById('container');
    const loader = createLoader(pokemonsContainer);
    let fetchPromises = [];
    pokemonData.forEach(key => {
        fetchPromises.push(fetchCharacterDetailsAndAppend(key.url));
    });
    Promise.all(fetchPromises)
    .then(() => pokemonsContainer.removeChild(loader))
    .catch(error => {
      console.error('Error fetching Pokemon details:', error);
      pokemonsContainer.removeChild(loader);
    });
};

const createLoader = (pokemonsContainer) => {
    const loadingPage = document.createElement('h1');
    loadingPage.classList.add('loader');
    loadingPage.innerText = 'Loading please wait...';
    pokemonsContainer.appendChild(loadingPage);
    return loadingPage;
};

const fetchCharacterDetailsAndAppend = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        createAndAppendDetails(data);
    } catch (error) {
        console.log(error);
    }
};

const createAndAppendDetails = (pokemonData) => {
    const pokemonsContainer = document.getElementById('container');
    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon');
    pokemonContainer.addEventListener('click',() => showOtherDetails(pokemonData,pokemonsContainer));
    const name = createName(pokemonData);
    pokemonContainer.appendChild(name);
    const id = createId(pokemonData);
    pokemonContainer.appendChild(id);
    const image = createImage(pokemonData);
    pokemonContainer.appendChild(image);
    const type = createType(pokemonData);
    pokemonContainer.appendChild(type);
    pokemonsContainer.appendChild(pokemonContainer);
};

const showOtherDetails = (data, parentContainer) => {
    // Remove existing details if they exist
    const existingDetails = parentContainer.querySelector('pokemon');
    if (existingDetails) {
        existingDetails.remove();
    }

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details');
    
    const heightAndWidthDetails = document.createElement('p');
    heightAndWidthDetails.textContent = 'Height: ' + data.height + ', Weight: ' + data.weight;
    
    detailsContainer.appendChild(heightAndWidthDetails);
    parentContainer.appendChild(detailsContainer);
};

const createName = (data) => {
    const characterName = document.createElement('h4');
    characterName.textContent = 'NAME: ' + data.name;
    return characterName;
};

const createId = (data) => {
    const characterId = document.createElement('p');
    characterId.textContent = 'Id: ' + data.id;
    return characterId;
};

const createImage = (data) => {
    const characterImage = document.createElement('img');
    characterImage.classList.add('characterImage');
    characterImage.src = data.sprites.front_default || "src/img/image.png"; characterImage.alt = data.name;
    return characterImage;
};

const createType = (data) => {
    const characterType = document.createElement('p');
    // console.log(data.types);
    characterType.textContent = 'Type: ' + data.types.map((pokemonType) => pokemonType.type.name);
    return characterType;
};

const searchBar = () => {
  const pokemonContainer = document.getElementsByClassName('pokemon');
  const searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('input', () => {
    for (let index = 0; index < pokemonContainer.length; index++) {
      const showTheCharacter = pokemonContainer[index];
      if (showTheCharacter.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
          showTheCharacter.style.display = 'block';
      } else {
          showTheCharacter.style.display = 'none';
      }
    }
  });
};

window.onload = () => {
    fetchPokemonDetails();
    searchBar();
}
