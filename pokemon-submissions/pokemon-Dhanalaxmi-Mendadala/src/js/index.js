const allData = [];
let isResolved = false;
const fetchPokemonData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const pokemonsData = await fetchData.json();
      for (const pokemon of pokemonsData.results) {
        const otherData = await fetch(pokemon.url);
        const object = await otherData.json();
        allData.push({
          name: object.name,
          id: object.id,
          image: object.sprites.front_default,
          type: `${object.types[0].type.name}`,
        });
      }
    }
    catch (error) {
      reject(error);
    }
    isResolved = true;
    resolve(allData);
  });
};
const createAndAppendDiv = (pokemon) => {
  const main = document.getElementById('main');
  const div = document.createElement('div');
  div.classList.add('pokemon');
  const image = document.createElement('img');
  const name = document.createElement('h2');
  const type = document.createElement('h5');
  const id = document.createElement('h5');
  image.src = pokemon.image;
  name.innerText = pokemon.name || 'pokemon';
  div.id = pokemon.id;
  id.innerText = `Pokemon Id: ${pokemon.id || 'id not exist'}`;
  type.innerText = `Pokemon Type: ${pokemon.type || 'normal'}`;
  div.append(name, image, id, type);
  main.append(div);
}
const renderPokemons = async () => {
  const pokemons = await fetchPokemonData();
  if (isResolved) {
    document.getElementById('loader').remove();
  }
  for (const pokemon of pokemons) {
    createAndAppendDiv(pokemon);
  }
};
const search = () => {
  const input = document.getElementById('search').value.toLowerCase();
  allData.forEach((element) => {
    const pokemonDiv=document.getElementById(element.id);
    pokemonDiv.hidden = !(Object.values(element).some((eachData) => {
      return eachData.toString().includes(input);
    }));
  });

};
const setLoader = async () => {
  const main = document.getElementById('main');
  const loaderBox = document.createElement('div');
  const loader = document.createElement('div');
  const text = document.createElement('h2');
  loaderBox.id = 'loader';
  text.innerText = 'Loading....';
  loaderBox.append(loader, text);
  main.append(loaderBox);
};
window.onload = async () => {
  setLoader();
  renderPokemons();
  document.getElementById('search').addEventListener('input', search);
};