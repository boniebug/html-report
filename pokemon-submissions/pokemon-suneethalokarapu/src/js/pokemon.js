const fetchPokemonData = function () {
  loadingMessage();
  fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1032")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.results;
    })
    .then((data) => {
      let count = 1;
      data.forEach((item) => {
        const pokemon = {};
        pokemon.name = item.name;
        pokemon.url = item.url;
        fetch(pokemon.url)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            pokemon.type = [];
            pokemon.ability=[];
            pokemon.move=[];
            pokemon.stat=[];
            pokemon.weakness=[];
            response.types.forEach((types) => {
              pokemon.type.push(types.type.name);
              fetch(types.type.url)
              .then((response)=>{
                return response.json();
              })
              .then((response)=>{
               response.damage_relations.double_damage_from.forEach((damageFrom)=>{
                pokemon.weakness.push(damageFrom.name);

               })
              })
            });
            response.abilities.forEach((abilities) =>{
              pokemon.ability.push(abilities.ability.name);
            })
            response.moves.forEach((moves) =>{
              pokemon.move.push(moves.move.name);
            })
            response.stats.forEach((stats) =>{
              pokemon.stat.push(stats.stat.name);
            })
            pokemon.height= response.height;
            pokemon.weight = response.weight;
            pokemon.id = response.id;
            pokemon.image = response.sprites.other.home.front_default;
            loadPokemon(pokemon);
            count++;
            if (count === data.length) {
              document.getElementById("loader").remove();
            }
          });
      });
    });
};

const search = function (pokemondetials, pokemonElement) {
  const searchValue = document.getElementById("search").value;
  pokemonElement.forEach((element) => {
    element.style.display = "none";
  });
  pokemondetials.forEach((pokemon, index) => {
    if (
      pokemon.name.includes(searchValue) ||
      pokemon.id.toString().includes(searchValue) ||
      pokemon.type.some((type) => type.includes(searchValue))
    ) {
      pokemonElement[index].style.display = "block";
    }
  });
};

const loadingMessage = function () {
  let loading = document.createElement("div");
  loading.setAttribute("id", "loader");
  loading.innerText = " loading.....";
  let main = document.getElementById("container");
  main.appendChild(loading);
};
const createPokemonHeight = function (pokemonHeight){
  let height = document.createElement("p");
  height.innerText = "Height :" + pokemonHeight;
  return height;
}
const createPokemonWeight= function (pokemonWeight){
  let weight = document.createElement("p");
  weight.innerText = "Weight:" + pokemonWeight;
  return weight;
}
const createPokemonMoves= function (pokemonMoves){
  let moves = document.createElement("p");
  moves.innerText = "Moves:" + pokemonMoves;
  return moves;
}
const createPokemonAbilities= function (pokemonAbilities){
  let abilities = document.createElement("p");
  abilities.innerText = "Abilities:" + pokemonAbilities;
  return abilities;
}
const createPokemonStatistic = function (pokemonStatistic){
  let statistic = document.createElement("p");
  statistic.innerText = "statistic :" + pokemonStatistic;
  return statistic;
}
const createPokemonName = function (pokemonName) {
  let name = document.createElement("h4");
  name.innerText = "Name :" + pokemonName;
  return name;
};
const createPokemonWeakness = function (pokemonWeakness) {
  let Weakness = document.createElement("p");
  Weakness.innerText = "Weakness :" + pokemonWeakness;
  return Weakness;
};
const createPokemonId = function (pokemonId) {
  let id = document.createElement("p");
  id.innerText = "Id :" + pokemonId;
  return id;
};

const createPokemonType = function (pokemonType) {
  let type = document.createElement("p");
  type.innerText = "Type :" + pokemonType;
  return type;
};

const createPokemonImage = function (image) {
  let img = document.createElement("img");
  img.src = image;
  img.height="200";
  return img;
};

function loadPokemon(pokemon) {
  const container = document.querySelector("#container");
  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("box");
  let pokemondetials = [];
  let pokemonElement = [];
  pokemondetials.push(pokemon);
  pokemonContainer.appendChild(createPokemonImage(pokemon.image));
  pokemonContainer.appendChild(createPokemonName(pokemon.name));
  pokemonContainer.appendChild(createPokemonId(pokemon.id));
  pokemonContainer.appendChild(createPokemonType(pokemon.type));
  container.appendChild(pokemonContainer);
  pokemonElement.push(pokemonContainer);
  document.getElementById("search").addEventListener("input", () => {
    search(pokemondetials, pokemonElement);
  });
  pokemonContainer.addEventListener("click",()=>{
    displayExtraPropertiesOfPokemon(pokemon,pokemonContainer);
  })
}
const displayExtraPropertiesOfPokemon = function(pokemon){
  const pokemonContainer=document.createElement("div");
  pokemonContainer.className="pokemonDetails";
  const hide= document.createElement("div");
  hide.className="hide";
  hide.innerText="X";
  pokemonContainer.appendChild(hide);
  pokemonContainer.appendChild(createPokemonImage(pokemon.image));
  pokemonContainer.appendChild(createPokemonName(pokemon.name));
  pokemonContainer.appendChild(createPokemonId(pokemon.id));
  pokemonContainer.appendChild(createPokemonType(pokemon.type));
   pokemonContainer.appendChild(createPokemonAbilities(pokemon.ability));
   pokemonContainer.appendChild(createPokemonHeight(pokemon.height));
   pokemonContainer.appendChild(createPokemonWeight(pokemon.weight));
   pokemonContainer.appendChild(createPokemonMoves(pokemon.move));
   pokemonContainer.appendChild(createPokemonStatistic(pokemon.stat));
   pokemonContainer.appendChild(createPokemonWeakness(pokemon.weakness));
  const container=document.getElementById("container");
  container.classList.add("disabled");
  const navbar=document.getElementById("navBar");
  navbar.classList.add("disabled");
  document.body.appendChild(pokemonContainer);
  hide.addEventListener("click",()=>{
    pokemonContainer.remove();
    container.classList.remove("disabled");
    navbar.classList.remove("disabled");
  })
}
window.onload = () => {
  fetchPokemonData();
};
