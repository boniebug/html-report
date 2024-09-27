
const dataLimit = async function () {
  const data = await fetchAPI();
  return Object.values(data)[3].length;
};

const fetchAPI = async function () {
  try{
  const url = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0');
  const pokemon = await url.json();
  return pokemon;
  }
  catch(error){
    console.log(error);
  } 
};

const data = async function (container, index) {
  try{
  const extraData = await fetchAPI();
  const result = await fetch(extraData.results[index].url);
  const properties = await result.json();
  const div = createContainer(extraData, properties, index);
  container.append(div);
  }
  catch(error){
    console.log(error);
  }
};

const createContainer = function (extraData, properties, index) {
  const div = document.createElement('div');
  div.className = 'content';
  const img = document.createElement('img');
  img.className = 'img';
  const id = document.createElement('p');
  id.className = 'id';
  const type = document.createElement('p');
  type.className = 'type';
  const name = document.createElement('h2');
  name.className = 'name';
  name.innerText = `${extraData.results[index].name}`
  id.innerText = ` id = ${properties.id}`
  type.innerText = ` type = ${properties.types['0'].type.name}`
  img.src = properties.sprites.front_default;
  div.append(img, name, id, type);
  return div;
};

const main = async (loader) => {
  const container = document.createElement('div');
  container.className = 'container';
  const limit = await dataLimit()
  let index = 0;
  while (index < limit) {
    await data(container, index);
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
  await main(loader);
};

window.onload = async () => {
  await load();
  searchaddevent();
};
