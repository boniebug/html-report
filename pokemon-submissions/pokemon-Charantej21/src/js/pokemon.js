'use strict';
async function fetchPokemonDetails() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302');
  const data = await response.json();
  const pokemonList = data.results;
  const pokemonContainer = document.getElementById('pokemon-container');
  for (const pokemon of pokemonList) {
    const res = await fetch(pokemon.url.slice(0, pokemon.url.length - 1));
    const pokemonData = await res.json();
    const divelem = document.createElement('section');
    const pokemonImg = document.createElement('img');
    const pokemonName = document.createElement('div');
    const pokemonId = document.createElement('div');
    const pokemonType = document.createElement('div');
    const pokemonWeakness = document.createElement('p');
    const pokemonHeight = document.createElement('p');
    const pokemonAbility = document.createElement('p');
    const pokemonStats = document.createElement('p');
    const pokemonMoves = document.createElement('p');
    pokemonHeight.innerText = 'Height:' + pokemonData.height;
    const pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight:' + pokemonData.weight;
    const detailsButton = document.createElement('button');
    detailsButton.innerText = 'Details';
    divelem.classList.add('pokemonNm');
    detailsButton.classList.add('details-btn');
    pokemonImg.src = pokemonData.sprites.other.home.front_default;
    pokemonImg.alt = pokemonData.name;
    pokemonName.innerText = 'Name: ' + pokemonData.name;
    pokemonId.innerText = 'Id: ' + pokemonData.id;
    pokemonType.innerText = 'Type: ';
    pokemonAbility.innerText = 'Ability: ';
    pokemonStats.innerText = 'Stats: ';
    pokemonMoves.innerText = 'Moves: ';
    pokemonData.moves.forEach((move) => {
      pokemonMoves.innerText += move.move.name + ', ';
    });
    pokemonMoves.innerText = pokemonMoves.innerText.slice(0, -2);
    pokemonData.stats.forEach((stat) => {
      pokemonStats.innerText += stat.stat.name + ', ';
    });
    pokemonStats.innerText = pokemonStats.innerText.slice(0, -2);
    pokemonData.abilities.forEach((ability) => {
      pokemonAbility.innerText += ability.ability.name + ', ';
    });
    pokemonAbility.innerText = pokemonAbility.innerText.slice(0, -2);
    pokemonWeakness.innerText = 'Weakness: ';
    let typesText = '';
    pokemonData.types.forEach((type, index) => {
      if (index < 2) {
        typesText += type.type.name + ', ';
      }
    });
    pokemonType.innerText = 'Type: ' + typesText.slice(0, -2);
    pokemonData.types.forEach((type, index) => {
      fetch(type.type.url).then((weaknessData) => weaknessData.json())
        .then((weaknessData) => {
          weaknessData.damage_relations.double_damage_from.forEach((weakness) => {
            pokemonWeakness.innerText += weakness.name;
            pokemonWeakness.innerText += ', ';
          });
          pokemonWeakness.innerText = pokemonWeakness.innerText.slice(0, -2);
        });
    });
    detailsButton.addEventListener('click', () => {
      detailsContainer(event, pokemonHeight, pokemonWeight, pokemonWeakness, pokemonAbility, pokemonStats, pokemonMoves);
      const buttons = document.querySelectorAll('.pokemonNm button');
      buttons.forEach(button => button.disabled = true);
    });
    divelem.append(pokemonImg, pokemonName, pokemonId, pokemonType, detailsButton);
    pokemonContainer.appendChild(divelem);
  }
};

const searchList = () => {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const listItems = document.querySelectorAll('.pokemonNm');
  listItems.forEach(item => {
    const name = item.querySelector('div:nth-of-type(1)').textContent.toLowerCase();
    const id = item.querySelector('div:nth-of-type(2)').textContent.toLowerCase();
    const type = item.querySelector('div:nth-of-type(3)').textContent.toLowerCase();
    if (name.includes(searchInput) || id.includes(searchInput) || type.includes(searchInput)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};
const detailsContainer = (event, height, weigth, weakNess, ability, stats, moves) => {
  const divelement = document.querySelector('.popup-container');
  event.target.innerText = 'Details';
  divelement.style.display = 'block';
  const closeButton = document.createElement('button');
  closeButton.innerText = "close";
  closeButton.addEventListener('click', () => {
    divelement.style.display = 'none';
    const buttons = document.querySelectorAll('.pokemonNm button');
    buttons.forEach(button => button.disabled = false);
    divelement.innerText = '';
  });
  const uElement = document.createElement('u');
  uElement.innerText = 'pokemon Details';
  divelement.appendChild(uElement);
  divelement.appendChild(height);
  divelement.appendChild(weigth);
  divelement.appendChild(weakNess);
  divelement.appendChild(ability);
  divelement.appendChild(stats);
  divelement.appendChild(moves);
  divelement.appendChild(closeButton);
};

async function main() {
  await fetchPokemonDetails();
  document.getElementById('loader').style.display = "none";
  document.getElementById('pokemonsdata').style.display = "block";
  document.querySelector('.page-heading').style.display = 'block';
};

main();
