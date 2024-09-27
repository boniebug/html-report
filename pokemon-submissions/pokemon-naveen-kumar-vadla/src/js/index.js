const showLoader = () => {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerText = 'Loading pokemons...';

  const main = document.querySelector('.main');
  main.appendChild(loader);
};

const hideLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
};


const fetchPokemons = async () => {
  const pokemonApiLink =
    'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';
  const { results } = await fetch(pokemonApiLink).then(res => res.json());
  return Promise.all(
    results.map(async ({ name, url }) => {
      try {
        const pokemonDetails = await fetch(url).then(res => res.json());
        const id = pokemonDetails.id;
        const imageUrl =
          pokemonDetails?.sprites?.other?.dream_world?.front_default ||
          pokemonDetails?.sprites?.other['official-artwork']?.front_default ||
          pokemonDetails?.sprites?.other['official-artwork']?.front_shiny ||
          pokemonDetails?.sprites?.other?.home?.front_default ||
          'src/images/pokemon-logo-black-transparent.png';
        const types = pokemonDetails?.types?.map(
          typeDetails => typeDetails.type.name
        );
        return { id, name, imageUrl, types };
      } catch (e) {
        console.log(url, e);
        return undefined;
      }
    })
  ).then(res => res.filter(x => x));
};

const displayPokemon = (pokemonsContainer, pokemon) => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('pokemon');

  const id = document.createElement('p');
  id.innerText = pokemon.id;
  pokemonContainer.appendChild(id);

  const name = document.createElement('p');
  name.innerText = pokemon.name;
  pokemonContainer.appendChild(name);

  const image = document.createElement('img');
  image.src = pokemon.imageUrl;
  pokemonContainer.appendChild(image);

  pokemon.types.forEach(t => {
    const type = document.createElement('p');
    type.innerText = t;
    pokemonContainer.appendChild(type);
  });

  pokemonsContainer.appendChild(pokemonContainer);
};

const displayPokemons = async pokemonsData => {
  const main = document.querySelector('.main');
  const pokemonsContainer = document.createElement('div');
  pokemonsContainer.classList.add('pokemons-container');
  main.appendChild(pokemonsContainer);
  pokemonsData.forEach(p => displayPokemon(pokemonsContainer, p));
};

const main = () => {
  showLoader();
  fetchPokemons().then(displayPokemons).then(hideLoader);
};

window.onload = main;
