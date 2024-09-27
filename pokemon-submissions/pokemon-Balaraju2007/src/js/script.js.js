const arrayOfPokemons = [];

const hideLoading = function () {
  const totalPokemons = document.getElementById('pokemons');
  if (totalPokemons.innerText !== '') {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  }
}

const fetchEachPokemonDetails = async (pokemonName, url) => {
  const object ={ name: undefined,
                  id: undefined,
                  imageUrl: undefined,
                  type: undefined 
                };
  const eachPokemon = await fetch(url);
  const parseEachPokemon = await eachPokemon.json();
  const pokemonId = parseEachPokemon['id'];
  const pokemonImage = parseEachPokemon['sprites']['front_default'];
  let pokemonType1 = parseEachPokemon['types'][0]['type']['name'];
  const pokemonType2 = (parseEachPokemon['types'][1])?parseEachPokemon['types'][1]['type']['name']:undefined;
  if (pokemonType2) {
    pokemonType1 = pokemonType1+' '+pokemonType2;
  }
  object.name = pokemonName;
  object.id = pokemonId;
  object.imageUrl = pokemonImage;
  object.type = pokemonType1;
  return object;
}

const searchPokemons = function () {
  const pokemons = document.querySelectorAll('.pokemon');
  const pokemonData = document.getElementById('search');
  for (const index in arrayOfPokemons) {
    const value = arrayOfPokemons[index]['name'] + arrayOfPokemons[index]['id'] + arrayOfPokemons[index]['type'];
    if (value.toLowerCase().includes(pokemonData.value.toLowerCase())) {
      pokemons[index].style.display = 'block';
    } else {
      pokemons[index].style.display = 'none';
    }
  }
}

const displayDetails = function (section,pokemonName, pokemonId, pokemonImage, pokemonType) {
  const image = document.createElement('img');
  image.style.display = 'block';
  const name = document.createElement('p');
  const id = document.createElement('p');
  const type = document.createElement('p');
  section.appendChild(image);
  section.appendChild(name);
  section.appendChild(id);
  section.appendChild(type);
  image.src = pokemonImage;
  name.innerText = 'name :'+pokemonName;
  id.innerText = 'id :'+pokemonId;
  type.innerText = 'type :'+pokemonType;
}

const createAndAppendElements = function (pokemons) {
  const totalPokemons = document.getElementById('pokemons');
  for (let index = 0; index < pokemons.length; index++) {
    const section = document.createElement('section');
    section.className = 'pokemon';
    totalPokemons.appendChild(section);
    displayDetails(section, pokemons[index]['name'], pokemons[index]['id'], pokemons[index]['imageUrl'], pokemons[index]['type']);
  } 
}

const fetchPokemon = async () => {
  const totalPokemons = await fetch("https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=700/");
  const parsePokemons = await totalPokemons.json();
  const resultsArray = parsePokemons.results;
  for (const element of resultsArray) {
    const pokemonName = element.name;
    const pokemon =await fetchEachPokemonDetails(pokemonName, element.url);
    arrayOfPokemons.push(pokemon)
   }
   console.log(arrayOfPokemons.length)
   createAndAppendElements(arrayOfPokemons);
   hideLoading();
}

window.onload = function () {
  fetchPokemon();
}