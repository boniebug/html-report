
const getPokemonCount = async function () {
  const data = await fetchPokemonData();
  return Object.values(data)[3].length;
};

const fetchPokemonData = async function () {
  try{
  const url = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1032&offset=0');
  const pokemon = await url.json();
  return pokemon;
  }
  catch(error){
    console.log(error);
  } 
};

const fetchPokemonDetails = async function (container, index) {
  try{
  const pokemonList = await fetchPokemonData();
  const result = await fetch(pokemonList.results[index].url);
  const properties = await result.json();
  const div = createContainer(pokemonList, properties, index);
  container.append(div);
  }
  catch(error){
    console.log(error);
  }
};

const createContainer = function (pokemonList, properties, index) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const id = document.createElement('p');
  const type = document.createElement('p');
  const name = document.createElement('h2');
  const button = document.createElement('button');
  button.innerText = 'know more';
  button.className = 'button';
  givingClassNames(div, img, id, type,name);
  name.innerText = `${pokemonList.results[index].name}`;
  id.innerText = ` id = ${properties.id}`;
  let types = [];
    for (let index = 0; index < properties.types.length; index++) {
      types.push(` ${properties.types[index].type.name}`); 
    }
  type.innerText =` type = ${types}` ;
  img.src = properties.sprites.other['official-artwork'].front_default;
  const hidden = createHiddenContainer(properties, types);
  hidden.style.display= 'none';
  div.append(img, name, id, type, hidden, button);
  return div;
};

const createHiddenContainer = function(properties, types) {
  const hidden = document.createElement('div');
  const abilities = document.createElement('p');
  const height = document.createElement('p');
  const weight = document.createElement('p');
  const moves = document.createElement('p');
  const stats = document.createElement('p');
  const weakness = document.createElement('p');
  fetchHeightAndWeight(properties, height, weight, hidden);
  fetchOtherDetails(properties, abilities, moves, stats, hidden);
  fetchWeakness(properties, weakness, hidden);
  hidden.className = 'hidden';
  return hidden;
};

const fetchHeightAndWeight = function(properties, height, weight, hidden) {
  height.innerText = `height = ${properties.height}`;
  weight.innerText = `weight = ${properties.weight}`;
  hidden.append(height, weight);
};

const fetchWeakness = async function (properties, weakness, hidden) {
  const weaknessUrl= await fetch(`${properties.types['0'].type.url}`);
  const response = await weaknessUrl.json();
  const damage = [];
  for(let index = 0; index < response.damage_relations.double_damage_from.length;index ++) {
    damage.push(`${response.damage_relations.double_damage_from[index].name}`);
  }
  weakness.innerText = `weakness : ${damage} `;
  hidden.append(weakness);
};

const fetchOtherDetails = function (properties, abilities, moves, stats, hidden) {
  let ability = [];
  for (let index = 0; index < properties.abilities.length; index++) {
    ability.push(` ${properties.abilities[index].ability['name']}`); 
  }
  abilities.innerText = `abilities = ${ability}`;
  let move = [];
  for (let index = 0; index < properties.moves.length; index++) {
    move.push(` ${properties.moves[index].move['name']}`); 
  }
  moves.innerText = `moves = ${move}`;
  let stat = [];
  for (let index = 0; index < properties.stats.length; index++) {
    stat.push(` ${properties.stats[index].stat['name']} : ${properties.stats[index].base_stat} `); 
  }
  stats.innerText = `stat = ${stat}`;
  hidden.append(abilities, moves, stats);
  return;
}

const givingClassNames = function (div, img, id, type, name) {
  div.className = 'content';
  img.className = 'img';
  id.className = 'id';
  type.className = 'type';
  name.className = 'name';
}

const loadPokemonData = async (loader) => {
  const container = document.createElement('div');
  container.className = 'container';
  const limit = await getPokemonCount()
  let index = 0;
  while (index < limit) {
    await fetchPokemonDetails(container, index);
    index++;
  }
  return new Promise((resolve, reject) => {
    document.body.removeChild(loader);
    document.body.append(container);
    resolve();
  })
};

const load = async function () {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);
  await loadPokemonData(loader);
};

window.onload = async () => {
  await load();
  await addSearchEvent();
  displayDetails();
};
