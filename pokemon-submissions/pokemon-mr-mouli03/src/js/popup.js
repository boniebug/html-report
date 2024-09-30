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
    return popupElement;
  };
  
  function createPokemonPopupDetails(pokemon, popupElement) {
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
  };

  function displayPokemonPopup(pokemon) {
    const popupElement = createPokemonPopupHeader(pokemon);
    createPokemonPopupDetails(pokemon, popupElement);
    document.body.appendChild(popupElement);
    popupElement.style.display = 'block';
  };
  

