'use strict';
const getAllPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0');
  const allPokemons = await response.json();
  return allPokemons.results;
};

const getPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    return pokemonDetails;
  } catch (error) {
    console.error(`Error fetching details for URL: ${url}`, error);
    return null;
  }
};

const getTypeDetails = async (typeName) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
    const typeDetails = await response.json();
    return typeDetails;
  } catch (error) {
    console.error(`Error fetching type details for ${typeName}:`, error);
    return null;
  }
};

const extractWeaknesses = (typeDetails) => {
  const weaknesses = typeDetails.damage_relations.double_damage_from;
  return weaknesses.map(weakness => weakness.name);
};

const createPokemonNameElement = (name) => {
  const displayPokemonName = document.createElement('p');
  displayPokemonName.innerText = `Name: ${name}`;
  return displayPokemonName;
};

const createPokemonIdElement = (id) => {
  const pokemonId = document.createElement('p');
  pokemonId.innerText = `ID: ${id}`;
  return pokemonId;
};

const createPokemonTypeElement = (types) => {
  const pokemonType = document.createElement('p');
  pokemonType.innerText = 'Type: ' + types.map(type => type.type.name).join(', ');
  return pokemonType;
};

const createPokemonImageElement = (imageUrl) => {
  const image = document.createElement('img');
  image.className = 'image';
  image.src = imageUrl || './src/images/noimage.jpeg';
  return image;
};

const createPokemonContainer = (pokemonData, pokemonDetails) => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.className = 'pokemonContainer';
  pokemonContainer.pokemonName = pokemonData.name.toLowerCase();
  pokemonContainer.pokemonId = pokemonDetails.id.toString();
  pokemonContainer.pokemonTypes = pokemonDetails.types;
  return pokemonContainer;
};

const createPokemonDetails = (pokemonData, pokemonDetails) => {
  const detailsOfPokemon = document.createElement('div');
  detailsOfPokemon.className = 'detailsOfPokemon';
  const pokemonNameElement = createPokemonNameElement(pokemonData.name);
  const pokemonIdElement = createPokemonIdElement(pokemonDetails.id);
  const pokemonTypeElement = createPokemonTypeElement(pokemonDetails.types);
  detailsOfPokemon.append(pokemonNameElement, pokemonIdElement, pokemonTypeElement);
  return detailsOfPokemon;
};

const createPokemonImage = (spriteUrl) => {
  return createPokemonImageElement(spriteUrl);
};

const extractPokemonAttributes = async (pokemonDetails) => {
  const weight = pokemonDetails.weight;
  const height = pokemonDetails.height;
  const abilities = pokemonDetails.abilities.map(ability => ability.ability.name).join(', ');
  const moves = pokemonDetails.moves.slice(0, 5).map(move => move.move.name).join(', ');
  const hp = pokemonDetails.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 'N/A';
  const attack = pokemonDetails.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 'N/A';
  const weaknesses = [];
  for (const type of pokemonDetails.types) {
    const typeDetails = await getTypeDetails(type.type.name);
    if (typeDetails) {
      const extractedWeaknesses = extractWeaknesses(typeDetails);
      weaknesses.push(...extractedWeaknesses);
    }
  }
  return { weight, height, abilities, moves, hp, attack, weaknesses };
};

const setupClickListener = (pokemonContainer, pokemonData, pokemonDetails, attributes) => {
  pokemonContainer.addEventListener('click', () => {
    updatePokemonDetails(
      pokemonData.name,
      pokemonDetails,
      attributes.weight,
      attributes.height,
      attributes.abilities,
      attributes.moves,
      attributes.hp,
      attributes.attack,
      attributes.weaknesses
    );
    showDetailsContainer();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  });
};

const updatePokemonDetails = (name, details, weight, height, abilities, moves, hp, attack, weaknesses) => {
  document.getElementById('detailName').innerText = `Name : ${name}`;
  document.getElementById('detailId').innerText = `ID : ${details.id}`;
  document.getElementById('detailType').innerText = `Type : ${details.types.map(type => type.type.name).join(', ')}`;
  document.getElementById('detailWeight').innerText = `Weight : ${weight}`;
  document.getElementById('detailHeight').innerText = `Height : ${height}`;
  document.getElementById('detailAbilities').innerText = `Abilities : ${abilities}`;
  document.getElementById('detailMoves').innerText = `Moves : ${moves}`;
  document.getElementById('detailStats').innerText = `HP : ${hp}, Attack : ${attack}`;
  document.getElementById('detailWeaknesses').innerText = `Weaknesses : ${weaknesses.join(', ')}`;
  document.getElementById('detailImage').src = details.sprites.other.home.front_default;
};

const createEachPokemonContainer = async (pokemonData, pokemonDetails) => {
  const pokemonContainer = createPokemonContainer(pokemonData, pokemonDetails);
  const detailsOfPokemon = createPokemonDetails(pokemonData, pokemonDetails);
  const pokemonImageElement = createPokemonImage(pokemonDetails.sprites.other.home.front_default);
  const attributes = await extractPokemonAttributes(pokemonDetails);
  pokemonContainer.append(pokemonImageElement, detailsOfPokemon);
  setupClickListener(pokemonContainer, pokemonData, pokemonDetails, attributes);
  return pokemonContainer;
};

const showDetailsContainer = () => {
  const detailsContainer = document.getElementById('pokemonDetails');
  detailsContainer.style.display = 'block';
};

const createCloseButton = () => {
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.className = 'closeButton';
  const detailsContainer = document.getElementById('pokemonDetails');
  detailsContainer.appendChild(closeButton);
  closeButton.onclick = () => {
    hideDetailsContainer();
  };
  return closeButton;
};

const hideDetailsContainer = () => {
  const detailsContainer = document.getElementById('pokemonDetails');
  detailsContainer.style.display = 'none';
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
};

const fetchPokemon = async () => {
  try {
    const allPokemons = await getAllPokemons();
    const pokemons = await accessPokemonData(allPokemons);
    const allPokemonsDetails = document.getElementById('allPokemonsDetails');
    pokemons.forEach(eachPokemon => {
      allPokemonsDetails.appendChild(eachPokemon);
    });
    removeLoading();
  } catch (error) {
    console.error('Error during Pokémon fetching process:', error);
  }
};

const accessPokemonData = async (allPokemons) => {
  const pokemonCollection = [];
  for (let index = 0; index < allPokemons.length; index++) {
    const pokemonData = allPokemons[index];
    const pokemonDetails = await getPokemonDetails(pokemonData.url);
    if (pokemonDetails) {
      const pokemon = await createEachPokemonContainer(pokemonData, pokemonDetails);
      pokemonCollection.push(pokemon);
    }
  }
  return pokemonCollection;
};

const filterPokemons = () => {
  const input = document.getElementById('search').value.toLowerCase();
  const allPokemonContainers = document.querySelectorAll('.pokemonContainer');
  allPokemonContainers.forEach(container => {
    const name = container.pokemonName;
    const id = container.pokemonId;
    const types = container.pokemonTypes;
    const typeMatches = types.some(type => type.type.name.toLowerCase().includes(input));
    if (name.includes(input) || id.includes(input) || typeMatches) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
};

const handleLoading = () => {
  const loadingText = document.createElement('div');
  loadingText.id = 'loadingText';
  loadingText.innerText = 'Loading....';
  document.body.append(loadingText);
};

const removeLoading = () => {
  const loadingText = document.getElementById('loadingText');
  if (loadingText) {
    loadingText.remove();
  }
};

window.onload = async () => {
  handleLoading();
  await fetchPokemon();
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', filterPokemons);
  createCloseButton();
};

