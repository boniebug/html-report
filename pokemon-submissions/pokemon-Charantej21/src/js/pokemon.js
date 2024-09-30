'use strict';
async function fetchPokemonDetails() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=102');
  const data = await response.json();
  const pokemonList = data.results;
  const pokemonContainer = document.getElementById('pokemon-container');
  for (const pokemon of pokemonList) {
    const res = await fetch(pokemon.url.slice(0, pokemon.url.length - 1));
    const pokemonData = await res.json();
    const divelem = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const pokemonName = document.createElement('span');
    const pokemonId = document.createElement('span');
    const pokemonType = document.createElement('span');
    const pokemonWeakness = document.createElement('p');
    const pokemonHeight = document.createElement('span');
    const pokemonWeight = document.createElement('span');
    const detailsButton = document.createElement('button');
    divelem.classList.add('pokemonNm');
    detailsButton.classList.add('details-btn');
    detailsButton.innerText = 'Details';
    pokemonImg.src = pokemonData.sprites.other.home.front_default;
    pokemonImg.alt = pokemonData.name;
    pokemonName.innerText = 'Name: ' + pokemonData.name;
    pokemonId.innerText = 'Id: ' + pokemonData.id;
    pokemonType.innerText = 'Type: ';
    pokemonWeakness.innerText = 'Weakness: ';
    pokemonHeight.innerText = 'Height: ' + pokemonData.height;
    pokemonWeight.innerText = 'Weight: ' + pokemonData.weight;
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
    divelem.append(pokemonImg, pokemonName, pokemonId, pokemonType, pokemonWeakness, pokemonHeight,pokemonWeight, detailsButton);
    pokemonContainer.appendChild(divelem);
  }
};

const searchList = () => {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const listItems = document.querySelectorAll('.pokemonNm');
  listItems.forEach(item => {
    const name = item.querySelector('span:nth-of-type(1)').textContent.toLowerCase();
    const id = item.querySelector('span:nth-of-type(2)').textContent.toLowerCase();
    const type = item.querySelector('span:nth-of-type(3)').textContent.toLowerCase();
    if (name.includes(searchInput) || id.includes(searchInput) || type.includes(searchInput)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

async function main() {
  await fetchPokemonDetails();
  document.getElementById('loader').style.display = "none";
  document.getElementById('pokemonsdata').style.display = "block";
  document.querySelector('.page-heading').style.display = 'block';
};

main();
