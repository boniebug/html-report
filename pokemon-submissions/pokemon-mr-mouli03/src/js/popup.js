function createPokemonPopupHeader(pokemon) {
    const popupElement = document.createElement('div');
    popupElement.className = 'pokemon-popup';
    const closeButtonElement = document.createElement('button');
    closeButtonElement.className = 'close-button';
    closeButtonElement.textContent = 'Close';
    closeButtonElement.addEventListener('click', () => {
      popupElement.style.display = 'none';
    });
    popupElement.appendChild(closeButtonElement);
    const pokemonNameElement = document.createElement('h4');
    pokemonNameElement.textContent = pokemon.name;
    popupElement.appendChild(pokemonNameElement);
    pokemonBasicDetails (pokemon, popupElement);
    return popupElement;
  };

  function pokemonBasicDetails (pokemon, popupElement) {
    const pokemonImageElement = document.createElement('img');
    if (pokemon.sprites.other.home.front_default) {
      pokemonImageElement.src = pokemon.sprites.other.home.front_default;
    } else {
      pokemonImageElement.src = 'src/images/image.jpeg';
    }
    pokemonImageElement.alt = pokemon.name;
    pokemonImageElement.className = 'pokemon-image';
    popupElement.appendChild(pokemonImageElement);
      const pokemonIdElement = document.createElement('p');
      pokemonIdElement.textContent = `ID: ${pokemon.id}`;
      popupElement.appendChild(pokemonIdElement);
      const pokemonTypeElement = document.createElement('p');
      let typesString = 'Type: ';
      pokemon.types.forEach((type) => {
        typesString += type.type.name + ', ';
      });
      typesString = typesString.slice(0, -2);
      pokemonTypeElement.textContent = typesString;
      popupElement.appendChild(pokemonTypeElement);
  };
  
  function createPokemonPopupDetails (pokemon, popupElement) {
    const pokemonHeightElement = document.createElement('p');
    pokemonHeightElement.textContent = `Height: ${pokemon.height}`;
    popupElement.appendChild(pokemonHeightElement);
    const pokemonWeightElement = document.createElement('p');
    pokemonWeightElement.textContent = `Weight: ${pokemon.weight}`;
    popupElement.appendChild(pokemonWeightElement);
    const pokemonAbilitiesElement = document.createElement('p');
    let abilitiesString = 'Abilities: ';
    pokemon.abilities.forEach((ability) => {
      abilitiesString += ability.ability.name + ', ';
    });
    abilitiesString = abilitiesString.slice(0, -2);
    pokemonAbilitiesElement.textContent = abilitiesString;
    popupElement.appendChild(pokemonAbilitiesElement);
    createPokemonDetails(pokemon, popupElement);
    createPokemonWeaknesses(pokemon, popupElement);
};

function createPokemonDetails(pokemon, popupElement) {
    const pokemonMovesElement = document.createElement('p');
    let movesString = 'Moves: ';
    pokemon.moves.forEach((move) => {
      movesString += move.move.name + ', ';
    });
    movesString = movesString.slice(0, -2);
    pokemonMovesElement.textContent = movesString;
    popupElement.appendChild(pokemonMovesElement);
    const pokemonStatsElement = document.createElement('p');
    let statsString = 'Stats: ';
    pokemon.stats.forEach((stat) => {
      statsString += stat.stat.name + ', ';
    });
    statsString = statsString.slice(0, -2);
    pokemonStatsElement.textContent = statsString;
    popupElement.appendChild(pokemonStatsElement);
};

function createPokemonWeaknesses(pokemon, popupElement) {
    const pokemonWeaknessesElement = document.createElement('p');
    pokemonWeaknessesElement.textContent = 'Weaknesses: Loading...';
    popupElement.appendChild(pokemonWeaknessesElement);
    const promises = pokemon.types.map(async (type) => {
      const response = await fetch(type.type.url);
      const typeData = await response.json();
      if (typeData.damage_relations && typeData.damage_relations.double_damage_from) {
        return typeData.damage_relations.double_damage_from.map((weakness) => weakness.name);
      } else {
        return [];
      }
    });
    Promise.all(promises).then((weaknesses) => {
      const weaknessesString = weaknesses.flat().join(', ');
      pokemonWeaknessesElement.textContent = `Weaknesses: ${weaknessesString}`;
    });
  };

  function displayPokemonPopup(pokemon) {
    const popupElement = createPokemonPopupHeader(pokemon);
    createPokemonPopupDetails(pokemon, popupElement);
    document.body.appendChild(popupElement);
    popupElement.style.display = 'block';
  };
  

