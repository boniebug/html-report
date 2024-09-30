
const searchByName = (searchValue) => {
  const namesList = [];
  dataOfAllpokemons['names'].forEach(name => {
    if (name.includes(searchValue)) {
      namesList.push(name);
    }
  });

  return namesList;
};

const getnamesByType = async (typeUrl) => {
  const namesList = [];
  const response = await fetch(typeUrl);
  const typeData = await response.json();
  for (const pokemon of typeData.pokemon) {
    namesList.push(pokemon['pokemon']['name']);
  }

  return namesList;
};

const getNamesbytypes = async (matchingTeypeList) => {
  const namesList = [];
  for (const type of matchingTeypeList) {
    const sameTypePokemons = await getnamesByType(type.url);
    for (const name of sameTypePokemons) {
      namesList.push(name);
    }
  }

  return namesList
};

const searchByType = async (searchValue) => {
  const matchingTeypeList = [];
  dataOfAllpokemons['types'].forEach(type => {
    if (type['name'].includes(searchValue)) {
      matchingTeypeList.push(type);
    }
  })

  return await getNamesbytypes(matchingTeypeList);
};


const getObjectsByNames = async (names) => {
  allPokemons = [];
  for (const name of names) {
    allPokemons.push(await getPokemonDetails(name));
  }

  return allPokemons;
};


const searchPokemons = async () => {

  let searchValue = document.getElementById('searchBar').value;
  searchValue = searchValue.toLowerCase();
  const namesList = [];

  if (!Number.isNaN(searchValue * 1)) {
    return [await getPokemonDetails(searchValue)];
  } else {
    searchByName(searchValue).forEach(name => {
      if (!namesList.includes(name)) {
        namesList.push(name);
      }
    })

    const listOfNamesBasedOnTyps = await searchByType(searchValue);
    listOfNamesBasedOnTyps.forEach((name) => {
      if (!namesList.includes(name)) {
        namesList.push(name);
      }
    })
  }

  return await getObjectsByNames(namesList);
};

const appendSearchResult = async () => {
  removeLoader();
  showLoader();
  const pokemonsContainer = document.getElementById('pokemonsContainer');
  pokemonsContainer.className = 'hide';
  const serachContainer = document.getElementById('searchedElements');
  const resultPokemons = await searchPokemons();
  appendCards(resultPokemons, serachContainer);
  removeLoader();
};

const creatTagForSearchTitle = () => {
  const serachContainer = document.getElementById('searchedElements');
  const serachTitle = document.createElement('h1');
  serachTitle.id = 'searchTitle';
  serachContainer.appendChild(serachTitle);

  return serachTitle;
}

const getSerachResults = () => {
  const searchValue = document.getElementById('searchBar').value;
  const serachContainer = document.getElementById('searchedElements');
  if (searchValue === '') {
    serachContainer.className = 'hide';
    document.getElementById('pokemonsContainer').className = 'showContainer';
    return null;
  }

  serachContainer.className = 'showContainer';
  serachContainer.innerHTML = '';
  let serachTitle = document.getElementById('searchTitle');
  if (!serachTitle) {
    serachTitle = creatTagForSearchTitle();
  }
  serachTitle.innerText = `Results for '${searchValue}' :`;
  appendSearchResult();
};