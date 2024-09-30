'use strict';

const createPopup = function (childs) {
  const div = document.createElement('div');
  div.className = 'popup';
  childs.forEach(element => div.appendChild(element));
  const button = document.createElement('button');
  button.innerText = 'close';
  button.addEventListener('click', () => div.remove());
  div.append(button);
  document.querySelector('main').append(div);
};

const createElements = function (data) {
  const h3 = document.createElement('h3');
  h3.innerText = data[0];
  const img = document.createElement('img');
  img.src = data[1];
  const tags = [h3, img];
  for (let index = 2; index < data.length; index++) {
    const p = document.createElement('p');
    p.innerText = data[index];
    tags.push(p);
  }
  return tags;
};

const moreDetials = async function (details) {
  const response = await fetch(details[details.length - 1]);
  const data = await response.json();
  console.log(data);
  
  const id = `ID : ${details[2]}`;
  const type = `Type : ${details[3]}`;
  const heightWeight = `Height & Weight : ${data.height} & ${data.weight}`;
  const moves = `Moves : ${data.moves.map(move => move.move.name).join(', ')}`;
  const abilities = `Abilities : ${data.abilities.map(ability => ability.ability.name).join(', ')}`;
  const stats = `Stats : ${data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}`;
  const tags = createElements([details[0], details[1], id, type, heightWeight, moves, abilities, stats]);
  createPopup(tags);
};

const appendPoke = function (data) {
  const section = document.createElement('section');
  let tags = ['h3', 'img', 'p', 'p'];
  tags = tags.map((element) => document.createElement(element));
  for (let index = 0; index < tags.length; index++) {
    if (index - 1) {
      tags[index].innerText = data[index];
    } else {
      tags[index].src = data[index];
    }
    section.append(tags[index]);
  }
  document.querySelector('.allPokemon').append(section);
  section.addEventListener('click', () => moreDetials(data));
};

const getPokeDetials = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const imgSrc = data.sprites.other.home.front_default || '';
    const type = [];
    (data.types).forEach(element => type.push(element.type.name));
    return [data.name, imgSrc, data.id, type.join(', '), url];
  } catch (error) {
    return ['', '', '', '', url];
  }
};

const fetchPokesData = async function () {
  const pokesData = [];
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const data = await response.json();
  for (let index = 0; index < data.count; index++) {
    const details = await getPokeDetials(data.results[index].url);
    pokesData.push(details);
  }
  return pokesData;
};

const createLoader = function (msg, removeOrNot) {
  const p = document.createElement('p');
  p.className = 'loader';
  p.innerText = msg;
  document.querySelector('main').append(p);
  if (removeOrNot) {
    setTimeout(() => p.remove(), 500);
  }
  return p;
};

window.onload = async function () {
  let loader;
  try {
    loader = createLoader('pokemons Loading...', false);
    document.querySelector('#search').addEventListener('click', search);
  } catch (error) {
    console.log(`Error : ${error}`);
  } finally {
    const structuredPokesData = await fetchPokesData();
    setTimeout(() => {
      structuredPokesData.forEach(element => {
        appendPoke(element);
      });
      loader.remove();
    }, 0);
  }
};
