const isMatchingSearchValue = (value, searchValue) => {
  return value.trim().toLowerCase().includes(searchValue);
};

const isTypeMatch = (pokemonTypes, searchValue) => {
  return pokemonTypes.some((type) => isMatchingSearchValue(type, searchValue));
};

const isIdMatch = (pokemonId, searchValue) => {
  return isMatchingSearchValue(pokemonId, searchValue);
};

const isNameMatch = (pokemonName, searchValue) => {
  return isMatchingSearchValue(pokemonName, searchValue);
};

const getPokemonTypes = (card) => {
  const types = [];
  card.querySelectorAll('.pokemon-type').forEach((type) => {
    types.push(type.textContent.toLowerCase());
  });
  return types;
};

const getPokemonId = (card) => {
  return card.querySelector('.pokemon-id').textContent;
};

const getPokemonName = (card) => {
  return card.querySelector('.pokemon-name').textContent.toLowerCase();
};

const isPokemonMatch = (card, searchValue) => {
  const pokemonName = getPokemonName(card);
  const pokemonId = getPokemonId(card);
  const pokemonTypes = getPokemonTypes(card);
  const isNameMatched = isNameMatch(pokemonName, searchValue);
  const isIdMatched = isIdMatch(pokemonId, searchValue);
  const areTypesMatched = isTypeMatch(pokemonTypes, searchValue);
  return isNameMatched || isIdMatched || areTypesMatched;
};

const getSearchValue = () => {
  const searchElement = document.getElementById('search');
  return searchElement.value.trim().toLowerCase();
};

const handleSearch = () => {
  const searchValue = getSearchValue();
  const pokemonCards = document.querySelectorAll('.pokemon-card');

  showLoadingIndicator();

  let hasMatch = false;

  pokemonCards.forEach((card) => {
    const isMatch = isPokemonMatch(card, searchValue);
    card.style.display = isMatch ? '' : 'none';
    if (isMatch) {
      hasMatch = true;
    }
  });

  if (!hasMatch) {
    showPopup('No matches found for your search.');
  }

  hideLoadingIndicator();
};