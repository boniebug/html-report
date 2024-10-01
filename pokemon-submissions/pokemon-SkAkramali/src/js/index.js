 'use strict';
const renderPokemon = async(url) => {
  try{
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error){
    console.log(error);
  }
};

const getWeekness = async(url) => {
  const response = await fetch(url);
  const weeknessData = await response.json();
  let weekness = weeknessData.damage_relations.double_damage_from[0].name;
  for (let index = 1; index < weeknessData.damage_relations.double_damage_from.length; index++) {
    weekness += ',' + weeknessData.damage_relations.double_damage_from[index].name;
  }
  return weekness;
};

const getmoves = (moves) => {
  let move = moves[0].move.name;
  for (let index = 1; index < moves.length; index++) {
   move += ',' + moves[index].move.name;
  } 
  return move;
};

const getStats = (statistics) => {
  let stats = statistics[0].stat.name;
  for(let index = 1; index < statistics.length; index++) {
    stats += ',' + statistics[index].stat.name;
  } 
  return stats;
};

const getAbilities = (abilities) => {
  let ablitity = abilities[0].ability.name;
  for(let index = 1; index < abilities.length; index++) {
    ablitity += ',' + abilities[index].ability.name;
  }
  return ablitity;
};

const createElement = () => {
  const imageContainer = document.createElement('img');
  const nameContainer = document.createElement('p');
  const id = document.createElement('p');
  const type = document.createElement('p');
  const height = document.createElement('p');
  const weight = document.createElement('p');
  const ability = document.createElement('p');
  const statistics = document.createElement('p');
  const moreDetails = document.createElement('div');
  const moves = document.createElement('p');
  const weekness = document.createElement('p');
  return { image: imageContainer, name: nameContainer,id: id, type: type, height: height, weight: weight, moreDetails: moreDetails, abilities: ability, statistics: statistics, moves: moves, weekness:weekness};
};

const addClassToDetails = (detailsContainer) => {
  detailsContainer.name.classList.add('name');
  detailsContainer.type.classList.add('type');
  detailsContainer.id.classList.add('id');
  detailsContainer.height.classList.add('pokemonHeight');
  detailsContainer.weight.classList.add('weight');
  detailsContainer.moreDetails.classList.add('moreDetails');
  detailsContainer.abilities.classList.add('abilities');
  detailsContainer.statistics.classList.add('stats');
  detailsContainer.moves.classList.add('moves');
  detailsContainer.weekness.classList.add('weekness');
};

const appendDetails = (details) => {
  const detailsContainer = createElement();
  detailsContainer.height.innerText = details.height;
  detailsContainer.image.src = details.imageUrl;
  detailsContainer.name.innerText = details.name;
  detailsContainer.id.innerText = details.pokenonId;
  detailsContainer.type.innerText = details.pokemonType;
  detailsContainer.weight.innerText = details.weight;
  detailsContainer.abilities.innerText = details.abilities;
  detailsContainer.statistics.innerText = details.statistics;
  detailsContainer.moves.innerText = details.moves;
  detailsContainer.weekness.innerText = details.weekness;
  addClassToDetails(detailsContainer);
  detailsContainer.moreDetails.append(detailsContainer.height, detailsContainer.weight, detailsContainer.abilities, detailsContainer.statistics, detailsContainer.moves, detailsContainer.weekness);
  const element = {image: detailsContainer.image, name: detailsContainer.name, id: detailsContainer.id, type: detailsContainer.type, moreDetails: detailsContainer.moreDetails};
  return element;
};
const getMoreDetails = async(pokemonData) => {
  const statistics = await getStats(pokemonData.stats);
  const abilities = await getAbilities(pokemonData.abilities);
  const moves = await getmoves(pokemonData.moves);
  const weekness = await getWeekness(pokemonData.types[0].type.url);
  return {statistics: statistics, abilities: abilities, moves: moves, weekness};
};

const createPokemon = async (pokemon, index) => {
  const pokemonContainer = document.createElement('div');
  const url = pokemon.url;
  try{
    const pokemonData = await renderPokemon(url);
    const extraDetails = await getMoreDetails(pokemonData);
    const details = {name: pokemon.name, imageUrl: pokemonData.sprites.front_default, pokenonId: pokemonData.id, pokemonType: pokemonData.types[0].type.name, height: pokemonData.height, weight: pokemonData.weight, abilities: extraDetails.abilities, statistics:extraDetails.statistics, moves: extraDetails.moves, weekness: extraDetails.weekness};
    const element = appendDetails(details);
    pokemonContainer.append(element.image,element.name, element.id, element.type, element.moreDetails);
    pokemonContainer.addEventListener('click', ()=> {showPopup(element, pokemonContainer)});
    pokemonContainer.setAttribute('class', 'pokemon');
    pokemonContainer.setAttribute('id', index);
    return pokemonContainer;
  } catch (error) {
    console.log(error);
  }
};

const appendPokemon = async (pokemons) => {
  const loading = document.querySelector('.pokemonContainer');
  const container = document.createElement('div');
  container.classList.add('pokemonContainer');
  let pokemon;
  for (let index = 0; index < pokemons.length; index++) {
    try{
      pokemon= await createPokemon(pokemons[index], index);
      container.appendChild(pokemon);
    } catch (error) {
      console.log(error);
    }
  }
  document.body.removeChild(loading);
  document.body.appendChild(container);
 };

const fetchPokemons = async() => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1100&offset=0';
  const response = await fetch(url);
  const pokemonsData = await response.json();
  const pokemons = pokemonsData.results;
  try {
    appendPokemon(pokemons);
  } catch (error) {
    console.log(error);
  }
};

const checker = (name, id, type, pokemon) => {
  const inputValue = document.querySelector('.search');
  const searchCritera = inputValue.value.toLowerCase()
  if(!(name.includes(searchCritera) || id.includes(searchCritera) || type.includes(searchCritera))) {
    pokemon.style.display = 'none';
  } else{
    pokemon.style.display = 'flex';
  }
};

const search = () => {
  const pokemons = document.querySelectorAll('.pokemon');
  for(let index = 0; index <= pokemons.length; index++) {
    try {
      const pokemon = document.getElementById(index);
      const details = pokemon.querySelectorAll('p');
      const pokemonName = details[0].innerText.toLowerCase();
      const pokemonid = details[1].innerText.toLowerCase();
      const pokemonType = details[2].innerText.toLowerCase();
      checker(pokemonName, pokemonid, pokemonType, pokemon)
    } catch (error) {
      console.log(error);
    }
  }
};

const removePopup = (pokemonContainer, details) => {
  details.moreDetails.style.display = 'none';
  pokemonContainer.append(details.image,details.name, details.id, details.type, details.moreDetails);
  const popup = document.querySelector('.more');
  document.body.removeChild(popup);
};

const showPopup = (details, pokemonContainer) => {
  const container = document.createElement('div');
  const pokemon = document.createElement('div');
  const cancleButton = document.createElement('button');
  cancleButton.innerText = 'cancle';
  cancleButton.classList.add('canclebutton');
  pokemon.classList.add('presentPokemon');
  details.moreDetails.style.display = 'block';
  pokemon.append(details.image,details.name, details.id, details.type, details.moreDetails, cancleButton,);
  container.append(pokemon);
  container.classList.add('more')
  cancleButton.classList.add('cancle');
  cancleButton.addEventListener('click', () =>{removePopup(pokemonContainer, details)});
  document.body.append(container);
};

window.onload = () => {
  const inputValue = document.querySelector('.search');
  inputValue.addEventListener('input', search);
  fetchPokemons();
};