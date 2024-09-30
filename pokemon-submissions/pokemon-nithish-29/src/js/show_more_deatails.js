'use strict';

const closeDetails = async () => {
  const detailsContainer = document.getElementById('showMoreDetails');
  while(detailsContainer.firstChild) {
    detailsContainer.removeChild(detailsContainer.firstChild);
  }
  detailsContainer.style.display = 'none';
};

const elementDetails = (tag, content, src = '') => {
  const element = document.createElement(tag);
  element.textContent = content;
  if (src) { 
    element.src = src
  } else if(tag === 'button') {
    element.onclick = () => closeDetails();
  }
  return element;
};

const createDetailElementsArray = (data) => {
  const elements = [];
  elements.push(elementDetails('h2', `Name: ${data.name}`));
  elements.push(elementDetails('h4', `ID: ${data.id}`));
  const image = data.sprites.other.home.front_default;
  elements.push(elementDetails('img', '', image));
  const types = data.types.map(t => t.type.name).join(', ');
  elements.push(elementDetails('h4', `Types: ${types}`));
  elements.push(elementDetails('h4', `Height: ${data.height}`));
  elements.push(elementDetails('h4', `Weight: ${data.weight}`));
  return elements;
};

const fetchWeakness = async (type) => {
  const respone = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await respone.json();
  return data;
};

const pokemenWeakness = async (type) => {
  const weaknessData = await fetchWeakness(type);
  let weaknesses = 'Not available';
  if (weaknessData && weaknessData.damage_relations) {
    weaknesses = weaknessData.damage_relations.double_damage_from
      .map(w => w.name).join(', ');
  }
  return weaknesses;
};

const createDetailedElements = async (data) => {
  const elements = createDetailElementsArray(data);
  const abilities = data.abilities.map(a => a.ability.name).join(', ');
  elements.push(elementDetails('h4', `Abilities :: ${abilities}`));
  const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ');
  elements.push(elementDetails('h4', `Statistics :: ${stats}`));
  const moves = data.moves.slice(0, 5).map(m => m.move.name).join(', ');
  elements.push(elementDetails('h4', `Moves :: ${moves}`));
  const weaknessData = await pokemenWeakness(data.types[0].type.name);
  elements.push(elementDetails('h4', `Weaknesses :: ${weaknessData}`));
  elements.push(elementDetails('button', `close`));
  return elements;
};


const appendDetails = async (detailsDiv, data) => {
  const detailsElements = await createDetailedElements(data);
  detailsElements.forEach(element => detailsDiv.appendChild(element));
  return detailsDiv;
};

const showDetails = async (data) => {
const detailsContainer = document.getElementById('showMoreDetails');
const detailsDiv = document.createElement('div');
detailsDiv.addEventListener('blur', closeDetails);
detailsContainer.appendChild(await appendDetails(detailsDiv, data));
detailsContainer.style.display = 'block';
};
