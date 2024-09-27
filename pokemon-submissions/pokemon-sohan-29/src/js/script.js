let id = 0;
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
}

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
  id.textContent = `Id: ${pokemon.id}`;
  type.textContent = `Type: ${pokemon.type}`;
  pokeCard.append(name, id, image, type);
  return pokeCard;
};

const createPokeCard = (pokemons) => {
  const pokedex = document.getElementById('pokemons');
  pokedex.innerText = '';
  pokemons.map(pokemon => {
    const name = document.createElement('span');
    const id = document.createElement('p');
    const type = document.createElement('p');
    const image = document.createElement('img');
    const pokeCard = createCard(pokemon, name, id, type, image);
    pokedex.append(pokeCard)
  });
};

const getType = async (id) => {
  try {
    const types = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`);
    const typeData = await types.json();
    const image = typeData.sprites.front_default;
    const numberOfTypes = [];
      typeData.types.map(types => {
      numberOfTypes.push(types.type.name);
    })
    return {
      id: id,
      type: numberOfTypes,
      imagesrc: image
    }
  } catch (error) {
    console.error('error: images and types are not found')
    return {
      id: id,
      type: 'not found',
      imagesrc: 'src/images/default.png'
    };
  }

};

const loadPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const data = await response.json();
  const pokemons = await Promise.all(data.results.map(async pokemon => {
    id = id + 1;
    const typeData = await getType(id);
    return {
      name: pokemon.name,
      id: typeData.id,
      type: typeData.type,
      imagesrc: typeData.imagesrc
    };
  }));
  createPokeCard(pokemons);
};
