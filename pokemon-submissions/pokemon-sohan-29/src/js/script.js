window.onload = () => {
  const pokedex = document.getElementById('pokemons')
  pokedex.innerText = 'Loading...';
  loadPokemons();
};

const searchBy = (searchInput, card) => {
  const type = card.querySelector('.type').textContent.toLowerCase();
  const id = card.querySelector('.id').textContent.toLowerCase();
  const name = card.querySelector('.name').textContent.toLowerCase();
  if (!type.includes(searchInput) && !id.includes(searchInput) && !name.includes(searchInput)) {
    card.style.display = 'none';
  }
};

const search = async () => {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.pokeCard');
  cards.forEach(card => {
    card.style.display = 'flex';
  })
  if (searchInput !== '') {
    cards.forEach(card => {
      searchBy(searchInput, card);
    })
    return;
  }
};

const createCard = (pokemon, name, id, type, image) => {
  const pokeCard = document.createElement('div');
  image.src = pokemon.imagesrc;
  pokeCard.className = 'pokeCard';
  name.className = 'name';
  id.className = 'id';
  type.className = 'type';
  name.textContent = pokemon.name;
  id.innerHTML = `<b>Id:</b> ${pokemon.id}`;
  type.innerHTML = `<b>Type:</b> ${pokemon.type}`;
  pokeCard.append(name, id, image, type);
  return pokeCard;
};

const createCloseButton = (infoCard) => {
  const closeButton = document.createElement('div');
  closeButton.innerText = 'X'
  closeButton.className = 'closeButton';
  closeButton.addEventListener('click', () => {
    infoCard.style.display = 'none';
  })
  return closeButton;
};

const addDataToInfoCard = (pokemon, name, height, weight, static, moves, weaknesses, abilities) => {
  const infoCard = document.createElement('div');
  infoCard.className = 'infoCard';
  const closeButton = createCloseButton(infoCard);
  name.innerText = pokemon.name;
  height.innerHTML = `<b>Height:</b> ${pokemon.height}`;
  weight.innerHTML = `<b>Weight:</b> ${pokemon.weight}`;
  static.innerHTML = `<b>Statistics:</b> ${pokemon.statics}`;
  moves.innerHTML = `<b>Moves:</b> ${pokemon.moves}`;
  weaknesses.innerHTML = `<b>Weaknesses:</b> ${pokemon.weaknesses}`
  abilities.innerHTML = `<b>Abilities:</b> ${pokemon.abilities}`
  infoCard.append(closeButton, name, height, weight, abilities, static, weaknesses, moves);
  return infoCard;
};

const createInfoCard = (pokemon) => {
  const name = document.createElement('p');
  name.className = 'name';
  const height = document.createElement('p');
  const weight = document.createElement('p');
  const abilities = document.createElement('p');
  const static = document.createElement('p');
  const moves = document.createElement('p');
  const weaknesses = document.createElement('p');
  const infoCard = addDataToInfoCard(pokemon, name, height, weight, static, moves, weaknesses, abilities);
  return infoCard;
};

const displayInfoCard = () => {
  const pokeCards = document.querySelectorAll('.pokeCard');
  pokeCards.forEach(card => {
    card.addEventListener('click', () => {
      const infoCard = card.nextElementSibling;
      infoCard.style.display = 'block';
    });
  });
};

const createPokeCard = (pokemons) => {
  const pokedex = document.getElementById('pokemons');
  pokedex.innerText = '';
  pokemons.forEach(pokemon => {
    const name = document.createElement('span');
    const id = document.createElement('p');
    const type = document.createElement('p');
    const image = document.createElement('img');
    const pokeCard = createCard(pokemon, name, id, type, image);
    const infoCard = createInfoCard(pokemon);
    pokedex.append(pokeCard, infoCard);
  });
  displayInfoCard();
};

const findWeaknesses = async (url) => {
  const weaknesses = [];
  const weakness = await fetch(url);
  const weaknessData = await weakness.json();
  weaknessData.damage_relations.double_damage_from.forEach(weakness => {
    weaknesses.push(weakness.name);
  })
  return weaknesses;
}

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const height = data.height;
  const weight = data.weight;
  const imagesrc = data.sprites.other.home.front_default;
  const numberOfTypes = [];
  const id = data.id;
  const statics = [];
  const moves = [];
  const abilities = [];
  const weaknesses = [];
  data.abilities.forEach(ability => {
    abilities.push(ability.ability.name);
  })
  data.moves.forEach(move => {
    moves.push(move.move.name);
  })
  data.stats.forEach(static => {
    statics.push(static.stat.name);
  })
  for (let i = 0; i < data.types.length; i++) {
    const type = data.types[i];
    const weakness = await findWeaknesses(type.type.url);
    numberOfTypes.push(type.type.name);
    weaknesses.push(weakness);
  }
  return {
    id: id,
    type: numberOfTypes,
    imagesrc: imagesrc,
    statics: statics,
    moves: moves,
    abilities: abilities,
    weaknesses: weaknesses,
    height: height,
    weight: weight
  };
};

const getType = async (url) => {
  try {
    const pokemonData = await fetchData(url);
    (pokemonData.imagesrc === null) ? pokemonData.imagesrc = 'src/images/default.png' : null;
    return pokemonData;
  } catch (error) {
    console.error('error: pokemon data not found');
    return {
      id: 'notfound',
      type: 'notfound',
      imagesrc: 'src/images/default.png'
    }
  }
};

const loadPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0');
  const data = await response.json();
  const pokemons = await Promise.all(data.results.map(async pokemon => {
    const pokemonData = await getType(pokemon.url);
    return {
      name: pokemon.name,
      id: pokemonData.id,
      type: pokemonData.type,
      imagesrc: pokemonData.imagesrc,
      statics: pokemonData.statics,
      moves: pokemonData.moves,
      abilities: pokemonData.abilities,
      weaknesses: pokemonData.weaknesses,
      height: pokemonData.height,
      weight: pokemonData.weight
    };
  }));
  createPokeCard(pokemons);
};
