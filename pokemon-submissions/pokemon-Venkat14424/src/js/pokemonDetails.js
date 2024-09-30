'use strict';

const fetchData = async (data) => {
  const response = await fetch(data.pokemon.url);
  const fetchData = await response.json();
  return fetchData;
}

const appendPokemanImage = async (data) => {
  const pokemonImg = document.createElement('img');
  let imgsrc;
  const alt = 'Pokemon image not found';
  try {
    const response = await fetch(data.pokemon.url);
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    const data2 = await response.json();
    imgsrc = data2.sprites.other.home.front_default;
    if (!imgsrc) {
      throw new Error('Image not found');
    }
  } catch (Error) {
    imgsrc = data.sprites.front_default;
  }
  pokemonImg.setAttribute('src', imgsrc);
  pokemonImg.setAttribute('alt', alt);
  return pokemonImg;
};

const appendPokemanId = (data) => {
  const pokemonId = document.createElement('p');
  pokemonId.classList.add('pokemonId');
  pokemonId.innerText = 'ID: ' + data.id;
  return pokemonId;
};

const appendPokemonName = (data) => {
  const pokemonName = document.createElement('p');
  pokemonName.classList.add('pokemonName');
  pokemonName.innerText = 'Name: ' + data.name;
  return pokemonName;
};


const appendPokemanType = (data) => {
  const pokemonTypes = document.createElement('p');
  pokemonTypes.classList.add('pokemonTypes');
  pokemonTypes.innerText = 'Types: ';
  data.types.forEach((type, index) => {
    pokemonTypes.innerText += type.type.name;
    if (index < data.types.length - 1) {
      pokemonTypes.innerText += ', ';
    }
  });
  return pokemonTypes;
};

const appendPokemonWeight = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonWeight = document.createElement('p');
  pokemonWeight.innerText = 'Weight: ' + fetchedData.weight;
  return pokemonWeight;
};

const appendPokemonHeight = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = 'Height: ' + fetchedData.height;
  return pokemonHeight;
};

const appendPokemonAbilities = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonAbilities = document.createElement('p');
  pokemonAbilities.innerText = 'Abilities: ';
  fetchedData.abilities.forEach((ability, index) => {
    pokemonAbilities.innerText += ability.ability.name;
    if (index < fetchedData.abilities.length - 1) {
      pokemonAbilities.innerText += ', ';
    }
  });
  return pokemonAbilities;
};

const appendPokemonStatistics = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonStatistics = document.createElement('p');
  pokemonStatistics.innerText = 'Statistics: ';
  fetchedData.stats.forEach((stat, index) => {
    pokemonStatistics.innerText += stat.stat.name;
    if (index < fetchedData.stats.length - 1) {
      pokemonStatistics.innerText += ', ';
    }
  });
  return pokemonStatistics;
};

const appendPokemonMoves = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonMoves = document.createElement('p');
  pokemonMoves.innerText = 'Moves: ';
  fetchedData.moves.forEach((move, index) => {
    pokemonMoves.innerText += move.move.name;
    if (index < fetchedData.moves.length - 1) {
      pokemonMoves.innerText += ', ';
    }
  });
  return pokemonMoves;
};

const appendPokemonWeaknesses = async (data) => {
  const fetchedData = await fetchData(data);
  const pokemonWeaknesses = document.createElement('p');
  pokemonWeaknesses.innerText = 'Weaknesses: ';
  for (const type of fetchedData.types) {
    const response = await fetch(type.type.url);
    const typeData = await response.json();
    typeData.damage_relations.double_damage_to.forEach((weakness, index) => {
      pokemonWeaknesses.innerText += weakness.name;
      if (index < typeData.damage_relations.double_damage_to.length - 1) {
        pokemonWeaknesses.innerText += ', ';
      }
    });
    pokemonWeaknesses.innerText += ', ';
    typeData.damage_relations.half_damage_to.forEach((weakness, index) => {
      pokemonWeaknesses.innerText += weakness.name;
      if (index < typeData.damage_relations.half_damage_to.length - 1) {
        pokemonWeaknesses.innerText += ', ';
      }
    });
  }
  return pokemonWeaknesses;
};


const closeButton = (data) => {
  const divTag = document.createElement('div');
  divTag.classList = 'closeButton';
  const button = document.createElement('button');
  button.innerText = 'close';
  divTag.appendChild(button);
  divTag.onclick = () => {
    data.remove();
  }
  return divTag;
}
