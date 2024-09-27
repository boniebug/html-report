function createPokemon(pokemonListElement, pokemonData, pokemonCard, index) {
  const pokemonImage = pokemonData.sprites.front_default;
  let pokemonTypes = '';
  pokemonData.types.forEach(types => {
    pokemonTypes += types.type.name + '';
  });

  const pokemonTitleElement = document.createElement('h2');
  pokemonTitleElement.innerText = `${pokemonData.name} (#${index + 1})`;
  pokemonCard.appendChild(pokemonTitleElement);

  const pokemonImageElement = document.createElement('img');
  pokemonImageElement.src = `${pokemonImage}`;
  pokemonImageElement.alt = `${pokemonData.name}`;
  pokemonCard.appendChild(pokemonImageElement);

  const pokemonTypeElement = document.createElement('p');
  pokemonTypeElement.innerText = `Type: ${pokemonTypes}`;
  pokemonCard.appendChild(pokemonTypeElement);

  pokemonListElement.appendChild(pokemonCard);
}

const createLoader = () => {
  const loader = document.createElement('div');
  loader.classList.add('loading');
  loader.innerText = 'Loading...';

  document.body.appendChild(loader);

  return loader;
};

window.onload = function () {
  const loader = createLoader();
  setTimeout(() => {
    loader.remove();
    pokemon();
  }, 5000);
};

async function pokemon() {
  const pokemonListElement = document.querySelector('.pokemonList');
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302');
  const data = await response.json();
  const pokemonList = data.results;

  for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon');
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    createPokemon(pokemonListElement, pokemonData, pokemonCard, i);
  }
}






