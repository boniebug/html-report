let pokemondetials = [];
const fetchPokemonData = function () {
  fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1800")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.results;
    })

    .then((data) => {
      data.forEach((data) => {
        const pokemon = {};
        pokemon.name = data.name;
        pokemon.url = data.url;
        fetch(pokemon.url)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            pokemon.type = [];
            response.types.forEach((types) => {
              pokemon.type.push(types.type.name);
            });
            pokemon.id = response.id;
            pokemon.image = response.sprites.front_default;
            return pokemon;
          })
          .then((data) => {
            loadpokemon(data);
          });
      });
    });
};
const search = function () {
  const searchValue = document.getElementById("search").value;
  const searchedPokemons = pokemondetials.filter((pokemon) => {
    return (
      pokemon.name.includes(searchValue) ||
      pokemon.id.toString().includes(searchValue)
    );
  });
  document.getElementById("container").innerText = "";
  if (searchedPokemons.length > 0) {
    searchedPokemons.forEach((pokemon) => {
      loadpokemon(pokemon);
    });
  }
};
const loadingMessage = function () {
  let loading = document.createElement("div");
  loading.classList.add("load");
  loading.innerText = " loading.....";
  let main = document.getElementById("container");
  main.appendChild(loading);
  fetchPokemonData();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(loading.remove());
    }, 4000);
  });
};
function loadpokemon(pokemon) {
  const container = document.querySelector("#container");
  container.style.display = "flex";
  const box = document.createElement("div");
  box.classList.add("box");
  let name = document.createElement("h4");
  let id = document.createElement("p");
  let type = document.createElement("p");
  let img = document.createElement("img");
  pokemondetials.push(pokemon);
  img.src = pokemon.image;
  name.innerText = "Name :" + pokemon.name;
  id.innerText = "Id :" + pokemon.id;
  type.innerText = "Type :" + pokemon.type;
  container.appendChild(box);
  box.appendChild(img);
  box.appendChild(id);
  box.appendChild(name);
  box.appendChild(type);
}
window.onload = () => {
  loadingMessage();
  const searchValue = document.getElementById("search");
  searchValue.addEventListener("input", search());
};
