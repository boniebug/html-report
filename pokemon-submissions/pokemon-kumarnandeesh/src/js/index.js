'use strict'

const toAppendName = (name) => {
  const nameContainer = document.createElement('h3');
  nameContainer.innerText = name;
  return nameContainer;
};

const toAppendId = (id) => {
  const idContainer = document.createElement('p');
  idContainer.innerText = id;
  return idContainer;
};

const toAppendImage = (url) => {
  const imageContainer = document.createElement('img');
  imageContainer.classList.add('imageContainer');
  imageContainer.src = url || './src/images/no-image2 - Copy.jpg';
  imageContainer.style.display = 'flex';
  return imageContainer;
};

const toAppendTypes = (types) => {
  const typeContainer = document.createElement('div');
  const typeElements = types.map((typeObj) => {
    const typeName = typeObj.type.name;
    const typeElement = document.createElement('span');
    typeElement.innerText = typeName;
    return typeElement;
  });

  typeElements.forEach((element, index) => {
    typeContainer.appendChild(element);
    if (index < typeElements.length - 1) {
      const comma = document.createElement('span');
      comma.innerText = ', ';
      typeContainer.appendChild(comma);
    }
  });
  return typeContainer;
};

const toAppendData = (dataArray, property, containerTitle) => {
  const container = document.createElement('div');
  const title = document.createElement('h4');
  title.innerText = containerTitle;
  container.appendChild(title);
  const itemsList = document.createElement('p');
  itemsList.innerText = '';
  let index = 0;
  const limit = dataArray.length < 5 ? dataArray.length : 5;
  while (index < limit) {
    itemsList.innerText += dataArray[index][property].name;
    index++;
    if (index < limit) {
      itemsList.innerText += ', ';
    }
  }
  container.appendChild(itemsList);
  return container;
};

const toAppendStats = (stats) => {
    const statsContainer = document.createElement('div');
    const title = document.createElement('h4');
    title.innerText = 'Stats';
    statsContainer.append(title);
    const statsLength = stats.length;
    for (let index = 0; index < statsLength; index++) {
        const stat = stats[index].base_stat;
        const statName = stats[index].stat.name;
        const statItem = document.createElement('p');
        statItem.innerText = `${statName}: ${stat}`;
        statsContainer.appendChild(statItem);
    }
    return statsContainer;
};


const toAppendWeakness = async (types) => {
    const weaknesses = [];
    for (let index = 0; index < types.length; index++) {
        const typeUrl = types[index].type.url;
        const response = await fetch(typeUrl);
        const typeData = await response.json();
        const damageRelations = typeData.damage_relations;
        damageRelations.double_damage_from.forEach(weakness => {
            if (!weaknesses.includes(weakness.name)) {
                weaknesses.push(weakness.name);
            }
        });
    }
    const weaknessContainer = document.createElement('div');
    weaknessContainer.innerHTML = `<h4>Weaknesses</h4><p>${weaknesses.join(', ')}</p>`;
    return weaknessContainer;
};

const toDisplay = () => {
    const mainContainer = document.getElementById('main');
    const loadContainer = document.getElementById('load');
    const body = document.getElementsByTagName('body')[0];
    loadContainer.classList.add('hide');
    loadContainer.classList.remove('loading');
    body.classList.remove('hide');
};

const displayInfo = async (pokemonData) => {
  const mainContainer = document.getElementById('main');
    const pokemonDataContainer = document.getElementById('pokemonDetails');
    const pokemonContainerCover = document.createElement('div');
    pokemonContainerCover.classList.add('displayCover');
    const closeButton = document.createElement('button');
    pokemonDataContainer.classList.remove('hide');
    closeButton.classList.add('button');
    closeButton.innerText = 'Close';
    pokemonDataContainer.textContent = '';
    pokemonDataContainer.classList.add('pokemonInformation')
    const data = pokemonData;
    const image = data.sprites.other.home.front_default;
    pokemonDataContainer.append(toAppendImage(image));
    const id = data.id;
    pokemonDataContainer.append(toAppendId(`ID : ${id}`));
    const name = data.name;
    pokemonDataContainer.append(toAppendName(`Name : ${name}`));
    const type = data.types;
    pokemonDataContainer.append(toAppendTypes(type));
    const height = data.height;
    pokemonDataContainer.append(toAppendId(`Height : ${height}`));
    const weight = data.weight;
    pokemonDataContainer.append(toAppendId(`Weight : ${weight}`));
    const moves = data.moves;
    pokemonDataContainer.append(toAppendData(moves, 'move', 'Moves'));
    const abilities = data.abilities;
    pokemonDataContainer.append(toAppendData(abilities, 'ability', 'Abilities'));
    const stats = data.stats;
    pokemonDataContainer.append(toAppendStats(stats));
    const weaknessContainer = await toAppendWeakness(pokemonData.types);
    pokemonDataContainer.append(weaknessContainer);
    pokemonDataContainer.appendChild(closeButton);
    mainContainer.appendChild(pokemonContainerCover);
    closeButton.addEventListener('click', function () {
        pokemonDataContainer.classList.add('hide');
        pokemonContainerCover.classList.remove('displayCover');

    });
};

const toFetchApi = async () => {
    try {
        const mainContainer = document.getElementById('main');
        mainContainer.classList.add('main');
        const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const pokemonData = await pokemonResponse.json();
        const pokemon = pokemonData.results;

        pokemon.forEach(async (pokemon) => {
            const pokemonContainer = document.createElement('div');
            pokemonContainer.classList.add('pokemonContainer');

            const pokemonName = pokemon.name;
            pokemonContainer.appendChild(toAppendName(pokemonName));

            const pokemonDetailsResponse = await fetch(pokemon.url);
            const data = await pokemonDetailsResponse.json();
            const image = data.sprites.other.home.front_default;
            pokemonContainer.appendChild(toAppendImage(image));

            const pokemonId = data.id;
            pokemonContainer.appendChild(toAppendId(`ID : ${pokemonId}`));

            const type = data.types;
            pokemonContainer.appendChild(toAppendTypes(type));
            mainContainer.appendChild(pokemonContainer);

            pokemonContainer.addEventListener('click', () => displayInfo(data));
        });
    } catch (error) {
        console.error(error);
    }
    toDisplay();
};

const search = () => {
    const searchData = document.getElementById('searchBar').value.toLowerCase();
    const pokemonSearch = document.querySelectorAll('.pokemonContainer');
    const message = document.createElement('div');
    pokemonSearch.forEach(container => {
        const nameText = container.querySelector('h3').innerText.toLowerCase();
        const idNumber = container.querySelector('p').innerText;
        const typeName = container.querySelector('div').innerText;
        const searchResults = (nameText.includes(searchData) || idNumber.includes(searchData) || typeName.includes(searchData));
        container.style.display = searchResults ? '' : 'none';
    });
};

const loadingFunction = () => {
    const loadContainer = document.getElementById('load');
    const mainContainer = document.getElementById('main');
    const body = document.getElementsByTagName('body')[0];
    loadContainer.classList.add('loading');
    loadContainer.innerText = 'Loading...';
    // mainContainer.style.display = 'none'; // Hide main container while loading
    // body.classList.add('hide');
};

window.onload = async () => {
    loadingFunction();
    await toFetchApi();
    toDisplay();
    document.getElementById('searchBar').addEventListener('input', search);
    // document.getElementsByClassName('pokemonContainer').addEventListener('click', displayInfo);
};
