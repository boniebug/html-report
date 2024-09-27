'use strict';

const appendPoke = async function (data) {
  const section = document.createElement('section');
  const h3 = document.createElement('h3');
  const img = document.createElement('img');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const tags = [h3, img, p1, p2];
  for (let index = 0; index < tags.length; index++) {
    if (index - 1) {
      tags[index].innerText = data[index];
    } else {
      tags[index].src = data[index];
    }
    section.append(tags[index]);
  }
  document.querySelector('.allPokemon').append(section);
};

const getPokeDetials = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return [data.name, data.sprites.front_default, data.id, data.types[0].type.name];
  } catch (error) {
    return [null, null, null, null];
  }

};

const fetchPokesData = async function () {
  const pokesData = [];
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const data = await response.json();
  await new Promise(async (resovle, reject) => {
    setTimeout(async () => {
      for (let index = 0; index < data.count; index++) {
        const details = await getPokeDetials(data.results[index].url);
        pokesData.push(details);
      }
      resovle();
    }, 0);
  });
  return pokesData;
};

const search = async function () {
  const userData = document.querySelector('#search').value.toLowerCase();
  setTimeout(() => {
    const allPokes = document.querySelectorAll('.allPokemon section');
    for (let index = 0; index < allPokes.length; index++) {
      const pokeData = allPokes[index].innerText.toLowerCase();
      if (pokeData.includes(userData)) {
        allPokes[index].style.display = 'block';
      } else {
        allPokes[index].style.display = 'none';
      }
    }
  }, 0);
};

/* const stillLoader = function () {
  document.querySelector('#search').value = '';
  const p = document.createElement('p');
  p.innerText = 'still loading...'
  document.querySelector('main').append(p);
  setTimeout(() => {
    p.remove();
  }, 1000);
}; */

window.onload = async function () {
  try {
    const structuredPokesData = await fetchPokesData();
    setTimeout(async () => {
      document.querySelector('.allPokemon').innerText = '';
      structuredPokesData.forEach(element => {
        appendPoke(element);
      });
    });
    document.querySelector('#search').addEventListener('input', () => {
      const boolOfLoader = document.querySelector('.allPokemon').innerText.includes('pokemons Loading...');
      (boolOfLoader) ? stillLoader() : search();
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};
