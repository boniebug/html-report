function createElement(element ,innerText , parentElement){
  const childElement = document.createElement(element);
  childElement.innerText = innerText;
  parentElement.appendChild(childElement);
}

function createCloseButton(pokemonMorecontent){
  const closeButtonElement = document.createElement('button'); 
  closeButtonElement.innerText = 'x';
  pokemonMorecontent.appendChild(closeButtonElement);
  closeButtonElement.classList.add('closeButton');
}

function createMoreDetails(pokemonMoreContent, pokemonInfo){
createCloseButton(pokemonMoreContent);

pokemonCardContent(pokemonInfo,pokemonMoreContent);

const moves =`Moves: ${pokemonInfo.moves.map(move => move.move.name).join(', ')}`;

const abilities = `Abilities: ${pokemonInfo.abilities.map(ability => ability.ability.name).join(', ')}`;

const statistics = `Statistics: ${pokemonInfo.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}`;

let weaknesses = `Weaknesses: `;

for (const type of pokemonInfo.types) {
fetch(type.url)
  .then(response => response.json())
  .then(typeData => {
  const weaknessesList = typeData.damage_relations.double_damage_from.map(weakness => weakness.name).join(', ');
  weaknesses += `${type.type.name}: ${weaknessesList}, `;
})
}

createElement('p', `Height: ${pokemonInfo.height}`, pokemonMoreContent);
createElement('p', `Weight: ${pokemonInfo.weight}`, pokemonMoreContent);
createElement('p', `${moves}`, pokemonMoreContent);
createElement('p', `${abilities}`, pokemonMoreContent);
createElement('p', `${statistics}`, pokemonMoreContent);
createElement('p', `${weaknesses}`, pokemonMoreContent);
}

function closeMoreDetailsContainer(moreDetailsContainer, header, pokemonList){
  moreDetailsContainer.remove();
  header.classList.remove('disabled');
  pokemonList.classList.remove('disabled');
}

function pokemonMoreDetails(pokemonInfo){

  const header = document.querySelector('.navBar');
  header.classList.add('disabled');

  const pokemonList = document.querySelector('.pokemonList');
  pokemonList.classList.add('disabled');

  const moreDetailsContainer = document.createElement('div');
  moreDetailsContainer.classList.add('moreDetailsContainer');

  const pokemonMoreContent = document.createElement('div');
  pokemonMoreContent.classList.add('moreContent');

  moreDetailsContainer.appendChild(pokemonMoreContent);

  document.body.appendChild(moreDetailsContainer);

  createMoreDetails(pokemonMoreContent, pokemonInfo);

  closeButtonClick = document.querySelector('.closeButton');

  closeButtonClick.addEventListener('click',() => {
     closeMoreDetailsContainer(moreDetailsContainer, header, pokemonList);
  });
}

function pokemonCardContent(pokemonInfo, pokemonCard){
  const pokemonImage = pokemonInfo.sprites.other.home.front_shiny;
  let pokemonTypes = '';
  pokemonInfo.types.forEach(types => {
    pokemonTypes += types.type.name + ' ';
  });

  createElement('h2', `${pokemonInfo.name} (#${pokemonInfo.id})`, pokemonCard);

  const pokemonImageElement = document.createElement('img');
  pokemonImageElement.src = `${pokemonImage}`;
  pokemonImageElement.alt = `${pokemonInfo.name}`;
  pokemonCard.appendChild(pokemonImageElement);

  createElement('p', `Type: ${pokemonTypes}`, pokemonCard);
}

function createPokemonCard(pokemonListElement, pokemonInfo) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon');

  pokemonCardContent(pokemonInfo,pokemonCard);

  pokemonListElement.appendChild(pokemonCard);

  pokemonCard.addEventListener('click',() => {
    pokemonMoreDetails(pokemonInfo);
  });
};

function createLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loading');
  loader.innerText = 'Loading...';
  const pokemonListElement = document.querySelector('.pokemonList');
  pokemonListElement.appendChild(loader);
  return loader;
};

function createSearchBar() {
  const searchInput = document.createElement('input');
  searchInput.placeholder = 'Search Pokemon';
  searchInput.classList.add('searchBar');
  const header = document.querySelector('.navBar');
  header.appendChild(searchInput);
  return searchInput;
};

function searchPokemon(pokemonListElement, pokemonDataArray, dataToSearch) {
  pokemonListElement.innerText = '';

  pokemonDataArray.forEach((pokemonInfo) => {
    if (
      pokemonInfo.name.toLowerCase().includes(dataToSearch.toLowerCase()) ||
      pokemonInfo.id.toString().includes(dataToSearch) ||
      pokemonInfo.types.some((type) => type.type.name.toLowerCase().includes(dataToSearch.toLowerCase()))
    ) {
      createPokemonCard(pokemonListElement, pokemonInfo);
    }
  });
};

async function fetchPokemonListData() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302');
  return response.json();
};

async function fetchPokemonDetails(pokemonInfoList) {
  let pokemonDataArray = [];

  const promises = pokemonInfoList.map(async (pokemon) => {
    const pokemonResponse = await fetch(pokemon.url);
    return pokemonResponse.json();
  });

  pokemonDataArray = await Promise.allSettled(promises);
  const finalPokemonArray = pokemonDataArray
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  return finalPokemonArray;
};

async function pokemonInfoList(searchInput, loader) {

  const data = await fetchPokemonListData();
  const pokemonInfoList = data.results;
  const pokemonDataArray = await fetchPokemonDetails(pokemonInfoList);
  console.log(pokemonDataArray)
  loader.remove();

  pokemonDataArray.forEach((pokemonInfo) => {
    createPokemonCard(document.querySelector('.pokemonList'), pokemonInfo);
  });

  searchInput.addEventListener('input', (e) => {
    searchPokemon(document.querySelector('.pokemonList'), pokemonDataArray, e.target.value);
  });
};

function pokemon() {
  const loader = createLoader();
  const searchInput = createSearchBar();
  pokemonInfoList(searchInput, loader);
};

window.onload = pokemon;