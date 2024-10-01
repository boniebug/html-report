const getStrengthAndWeakness = (pokemonTypeid) => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch(`https://pokeapi.co/api/v2/type/${pokemonTypeid}`);
      const resultData = await fetchedData.json();
      resolve(resultData);
    } catch (error) {
      console.log(error);
    }
  });
};

const createAMoreDetailsContainer = () => {
  const moreDetailsContainer = document.createElement('div');
  moreDetailsContainer.setAttribute('id', 'moreDetailsContainer');
  
  return moreDetailsContainer;
};

const closePopup = () => {
  const body = document.querySelector('body');
  const popup = document.querySelector('#moreDetailsContainer');
  const popupBackground = document.querySelector('#popupBackground');
  body.classList.remove('noScroll');
  popupBackground.remove();
  popup.remove();
};

const appendBackgroundDiv = () => {
  const container = document.querySelector('#containers');
  const backgroundDiv = document.createElement('div');
  backgroundDiv.setAttribute('id', 'popupBackground');
  backgroundDiv.setAttribute('onclick', 'closePopup()');
  container.before(backgroundDiv);
};

const appendCloseButton = (moreDetailsContainer) => {
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times';
  closeButton.setAttribute('id', 'closeButton');
  closeButton.setAttribute('onclick', 'closePopup()');
  moreDetailsContainer.appendChild(closeButton);
};

const appendPokemonHeight = (moreDetailsContainer, pokemonDetails) => {
  const pokemonHeightContainer = document.createElement('div');
  const pokemonHeighth3 = document.createElement('h3');
  pokemonHeighth3.innerText = 'Height: ';
  const pokemonHeightSpan = document.createElement('span');
  pokemonHeightSpan.innerText = pokemonDetails.height;
  pokemonHeightContainer.append(pokemonHeighth3, pokemonHeightSpan);
  moreDetailsContainer.appendChild(pokemonHeightContainer);
};

const appendPokemonWeight = (moreDetailsContainer, pokemonDetails) => {
  const pokemonWeightContainer = document.createElement('div');
  const pokemonWeighth3 = document.createElement('h3');
  const pokemonWeightSpan = document.createElement('span');
  pokemonWeighth3.innerText = 'Weight: ';
  pokemonWeightSpan.innerText = pokemonDetails.weight;
  pokemonWeightContainer.append(pokemonWeighth3, pokemonWeightSpan);
  moreDetailsContainer.appendChild(pokemonWeightContainer);
};

const appendPokemonMoves = (moreDetailsContainer, pokemonDetails) => {
  const pokemonMovesContainer = document.createElement('div');
  const pokemonMovesh3 = document.createElement('h3');
  pokemonMovesh3.innerText = 'Moves: ';
  const pokemonMovesSpan = document.createElement('span');
  pokemonDetails.moves.forEach((Amove, index, array) => {
    if (index < array.length - 1) {
      pokemonMovesSpan.innerText = pokemonMovesSpan.innerText + Amove.move.name + ', ';
    } else {
      pokemonMovesSpan.innerText = pokemonMovesSpan.innerText + Amove.move.name;
    }
  });
  pokemonMovesContainer.append(pokemonMovesh3, pokemonMovesSpan);
  moreDetailsContainer.append(pokemonMovesContainer);
};

const appendPokemonAbilities = (moreDetailsContainer, pokemonDetails) => {
  const pokemonAbilitiesContainer = document.createElement('div');
  const pokemonAbilitiesh3 = document.createElement('h3');
  pokemonAbilitiesh3.innerText = 'Abilities: ';
  const pokemonAbilitiesSpan = document.createElement('span');
  pokemonDetails.abilities.forEach((ability, index, array) => {
    if (index < array.length - 1) {
      pokemonAbilitiesSpan.innerText = pokemonAbilitiesSpan.innerText + ability.ability.name + ', ';
    } else {
      pokemonAbilitiesSpan.innerText = pokemonAbilitiesSpan.innerText + ability.ability.name;
    }
  });
  pokemonAbilitiesContainer.append(pokemonAbilitiesh3, pokemonAbilitiesSpan);
  moreDetailsContainer.append(pokemonAbilitiesContainer);
};

const appendPokemonStatistics = (moreDetailsContainer, pokemonDetails) => {
  const pokemonStatisticsContainer = document.createElement('div');
  const pokemonStatsh3 = document.createElement('h3');
  pokemonStatsh3.innerText = 'Statistics: ';
  moreDetailsContainer.appendChild(pokemonStatsh3);
  const pokemonStatsdiv = document.createElement('div');
  pokemonDetails.stats.forEach((aStat, index, array) => {
    if (index < array.length - 1) {
      pokemonStatsdiv.innerText = pokemonStatsdiv.innerText + `${aStat.stat.name}: ${aStat.base_stat}, `;
    } else {
      pokemonStatsdiv.innerText = pokemonStatsdiv.innerText + `${aStat.stat.name}: ${aStat.base_stat}`;
    }
  });
  pokemonStatisticsContainer.append(pokemonStatsh3, pokemonStatsdiv);
  moreDetailsContainer.appendChild(pokemonStatisticsContainer);
};

const createDoubleDamageTo = (strengthAndWeakness) => {
  const doubleDamageToContainer = document.createElement('div');
  const doubleDamageToh3 = document.createElement('h4');
  doubleDamageToh3.innerText = 'Double Damage To: ';
  const doubleDamageTodiv = document.createElement('div');
  strengthAndWeakness.damage_relations.double_damage_to.forEach((strength1, index, array) => {
    if (index < array.length - 1) {
      doubleDamageTodiv.innerText = doubleDamageTodiv.innerText + `${strength1.name}, `;
    } else {
      doubleDamageTodiv.innerText = doubleDamageTodiv.innerText + `${strength1.name}`;
    }
  });
  doubleDamageToContainer.append(doubleDamageToh3, doubleDamageTodiv);
  return doubleDamageToContainer;
};

const createHalfDamageFrom = (strengthAndWeakness) => {
  const halfDamageFromContainer = document.createElement('div');
  const halfDamageFromh3 = document.createElement('h4');
  halfDamageFromh3.innerText = 'Half Damage From: ';
  const halfDamageFromdiv = document.createElement('div');
  strengthAndWeakness.damage_relations.half_damage_from.forEach((strength2, index, array) => {
    if (index < array.length - 1) {
      halfDamageFromdiv.innerText = halfDamageFromdiv.innerText + `${strength2.name}, `;
    } else {
      halfDamageFromdiv.innerText = halfDamageFromdiv.innerText + `${strength2.name}`;
    }
  });
  halfDamageFromContainer.append(halfDamageFromh3, halfDamageFromdiv);
  return halfDamageFromContainer;
};

const appendPokemonStrength = (moreDetailsContainer, strengthAndWeakness) => {
  const strengthContainer = document.createElement('div');
  const pokemonStrength = document.createElement('h3');
  pokemonStrength.innerText = 'Strengths: '
  strengthContainer.appendChild(pokemonStrength);
  const doubleDamageTo = createDoubleDamageTo(strengthAndWeakness);
  const halfDamageFrom = createHalfDamageFrom(strengthAndWeakness);
  strengthContainer.append(doubleDamageTo, halfDamageFrom);
  moreDetailsContainer.appendChild(strengthContainer);
};

const createDoubleDamageFrom = (strengthAndWeakness) => {
  const doubleDamageFromContainer = document.createElement('div');
  const doubleDamageFromh3 = document.createElement('h4');
  doubleDamageFromh3.innerText = 'Double Damage From: ';
  const doubleDamageFromdiv = document.createElement('div');
  strengthAndWeakness.damage_relations.double_damage_from.forEach((weakness1, index, array) => {
    if (index < array.length - 1) {
      doubleDamageFromdiv.innerText = doubleDamageFromdiv.innerText + `${weakness1.name}, `;
    } else {
      doubleDamageFromdiv.innerText = doubleDamageFromdiv.innerText + `${weakness1.name}`;
    }
  });
  doubleDamageFromContainer.append(doubleDamageFromh3, doubleDamageFromdiv);
  return doubleDamageFromContainer;
};

const createHalfDamageTo = (strengthAndWeakness) => {
  const halfDamageToContainer = document.createElement('div');
  const halfDamageToh3 = document.createElement('h4');
  halfDamageToh3.innerText = 'Half Damage To: ';
  const halfDamageTodiv = document.createElement('div');
  strengthAndWeakness.damage_relations.half_damage_to.forEach((weakness2, index, array) => {
    if (index < array.length - 1) {
      halfDamageTodiv.innerText = halfDamageTodiv.innerText + `${weakness2.name}, `;
    } else {
      halfDamageTodiv.innerText = halfDamageTodiv.innerText + `${weakness2.name}`;
    }
  });
  halfDamageToContainer.append(halfDamageToh3, halfDamageTodiv);
  return halfDamageToContainer;
};

const appendPokemonWeakness = (moreDetailsContainer, strengthAndWeakness) => {
  const weaknessContainer = document.createElement('div');
  const pokemonWeakness = document.createElement('h3');
  pokemonWeakness.innerText = 'Weakness: '
  weaknessContainer.appendChild(pokemonWeakness);
  const doubleDamageFrom = createDoubleDamageFrom(strengthAndWeakness);
  const halfDamageTo = createHalfDamageTo(strengthAndWeakness);
  weaknessContainer.append(doubleDamageFrom, halfDamageTo);
  moreDetailsContainer.appendChild(weaknessContainer);
};

const appendMorePokemonDetailsToContainer = async (pokemonDetails) => {
  const container = document.querySelector('#containers');
  const moreDetailsContainer = createAMoreDetailsContainer();
  const strengthAndWeaknessData = await fetch(pokemonDetails.types[0].type.url);
  const strengthAndWeakness = await strengthAndWeaknessData.json();
  appendCloseButton(moreDetailsContainer);
  appendPokemonImage(moreDetailsContainer, pokemonDetails);
  appendBackgroundDiv();
  appendPokemonName(moreDetailsContainer, pokemonDetails);
  appendPokemonHeight(moreDetailsContainer, pokemonDetails);
  appendPokemonWeight(moreDetailsContainer, pokemonDetails);
  appendPokemonMoves(moreDetailsContainer, pokemonDetails);
  appendPokemonAbilities(moreDetailsContainer, pokemonDetails);
  appendPokemonStatistics(moreDetailsContainer, pokemonDetails);
  appendPokemonStrength(moreDetailsContainer, strengthAndWeakness);
  appendPokemonWeakness(moreDetailsContainer, strengthAndWeakness);
  container.before(moreDetailsContainer);
};

const makeDocumentNoScroll = () => {
  const body = document.querySelector('body');
  body.classList.add('noScroll');
};

const getMoreDetails = async (clickedPokemon) => {
  makeDocumentNoScroll();
  const pokemonid = clickedPokemon.querySelector('.pokemonid');
  const pokemonDetails = await getTheDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonid.classList[1]}`);
  appendMorePokemonDetailsToContainer(pokemonDetails);
};
