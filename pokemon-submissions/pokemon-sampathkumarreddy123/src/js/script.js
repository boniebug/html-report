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

const createPokemonNameElement = (name) => {
  const displayPokemonName = document.createElement('p');
  displayPokemonName.innerText = `Name : ${name}`;
  return displayPokemonName;
};

const createPokemonIdElement = (id) => {
  const pokemonId = document.createElement('p');
  pokemonId.innerText = `ID : ${id}`;
  return pokemonId;
};

const createPokemonTypeElement = (types) => {
  const pokemonType = document.createElement('p');
  pokemonType.innerText = 'Type: ' + types.map(type => type.type.name).join(', ');
  return pokemonType;
};

const createPokemonImageElement = (imageUrl, name) => {
  const image = document.createElement('img');
  image.className = 'image';
  image.src = imageUrl  || './src/images/noimage.jpeg';
  return image;
};

const createEachPokemonContainer = async (pokemonData, pokemonDetails) => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.className = 'pokemonContainer';
  pokemonContainer.pokemonName = pokemonData.name.toLowerCase(); 
  pokemonContainer.pokemonId = pokemonDetails.id.toString(); 
  pokemonContainer.pokemonTypes = pokemonDetails.types
  const pokemonNameElement = createPokemonNameElement(pokemonData.name);
  const pokemonIdElement = createPokemonIdElement(pokemonDetails.id);
  const pokemonTypeElement = createPokemonTypeElement(pokemonDetails.types);
  const pokemonImageElement = createPokemonImageElement(pokemonDetails.sprites.front_default, pokemonData.name);
  pokemonContainer.append(pokemonImageElement, pokemonIdElement, pokemonNameElement, pokemonTypeElement);
  return pokemonContainer;
};


const fetchPokemon = async () => {
  try {
    const allPokemons = await getAllPokemons();  
    const pokemons = await iteration(allPokemons)
    const allPokemonsDetails = document.getElementById('allPokemonsDetails');
    pokemons.forEach(eachPokemon => {
      allPokemonsDetails.appendChild(eachPokemon);  
    });
    removeLoading();
  } catch (error) {
    console.error('Error during Pokémon fetching process:', error);
  }
};

const iteration = async(allPokemons) =>{
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
}

const filterPokemons = () => {
  const input = document.getElementById('search').value.toLowerCase();
  const allPokemonContainers = document.querySelectorAll('.pokemonContainer');
  allPokemonContainers.forEach(container => {
    const name = container.pokemonName; 
    const id = container.pokemonId;    
    const types = container.pokemonTypes.join(',');  
    if (name.includes(input) || id.includes(input) || types.includes(input)) {
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
};
