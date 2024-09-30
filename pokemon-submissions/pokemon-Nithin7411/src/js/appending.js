const appendPokeName = function (data, pokemon) {
  const name = document.createElement("div");
  name.innerText = "Name: " + data.Name;
  pokemon.append(name);
};

const appendPokeId = function (data, pokemon) {
  const pokeId = document.createElement("div");
  pokeId.innerText = `ID: ${data.id}`;
  pokemon.append(pokeId);
};

const appendPokeImage = function (data, pokemon) {
  const pokeImg = document.createElement("img");
  pokeImg.src = data.ImgSrc;
  pokemon.append(pokeImg);
};

const appendPokeType = function (data, pokemon) {
  const types = document.createElement("div");
  types.innerText = "Types: " + data.Types;
  pokemon.append(types);
};

const appendPokeWeight = function (data, detailsHolder) {
  const weight = document.createElement("div");
  weight.innerText = `Weight : ${data.weight}`;
  detailsHolder.append(weight);
};
const appendPokeExp = function (data, detailsHolder) {
  const Exp = document.createElement("div");
  Exp.innerText = `EXP : ${data.EXP}`;
  detailsHolder.append(Exp);
};
const appendPokeHeight = function (data, detailsHolder) {
  const height = document.createElement("div");
  height.innerText = `height : ${data.height}`;
  detailsHolder.append(height);
};

const appendAbilities = function (data ,pokemon){
  const abilities = document.createElement('ol');

  const detailsHeadings = document.createElement('div');
  detailsHeadings.classList.add('detailsHeadings')
  detailsHeadings.innerText = "Abilities";
 abilities.append(detailsHeadings);

   data.forEach(abilityName => {
    const ability = document.createElement('li')
    ability.innerText = abilityName ;
    abilities.append(ability);
   });
  pokemon.append(abilities);
}


const appendMoves = function (data ,pokemon){
  
  const moves = document.createElement('ol');
  const detailsHeadings = document.createElement('div');
  detailsHeadings.classList.add('detailsHeadings')
  detailsHeadings.innerText = "moves";
  moves.append(detailsHeadings);
   data.forEach(moveName => {
    const move = document.createElement('li')
    move.innerText = moveName ;
    moves.append(move);
   });
  pokemon.append(moves);
}

const appendExpander = function (data) {
  const expander = document.createElement("div");
  expander.classList.add("expander");
  expander.innerText = ">";
  expander.addEventListener("click", function () {
    document.getElementById("detailsContainer").style.display = 'flex';
    document.body.addEventListener("dblclick", hideDisplayDetails)
    displayDetails(data);
  });
  return expander;
};

const hideDisplayDetails = function(){
    detailsContainer.style.display = 'none';
    document.body.removeEventListener("dblclick", hideDisplayDetails);
}
const appendStats = function (data, pokemon) {
  const stats = document.createElement('ol');

  const detailsHeadings = document.createElement('div');
  detailsHeadings.classList.add('detailsHeadings');
  detailsHeadings.innerText = "Stats";
  stats.append(detailsHeadings);

  data.forEach(function (stat) {
    const statItem = document.createElement('li');
    statItem.innerText = `${stat.name}: ${stat.base_stat}`;
    stats.append(statItem);
  });

  pokemon.append(stats);
};

const appendToDisplayDetails = function(data , detailsHolder){
  appendPokeImage(data, detailsHolder);
  appendPokeId(data, detailsHolder);
  appendPokeName(data, detailsHolder);
  appendPokeWeight(data, detailsHolder);
  appendPokeHeight(data, detailsHolder);
  appendPokeType(data, detailsHolder);
  appendPokeExp(data, detailsHolder);
  appendAbilities(data.abilities, detailsHolder);
  appendMoves(data.moves, detailsHolder);
  appendStats (data.stats, detailsHolder);
}