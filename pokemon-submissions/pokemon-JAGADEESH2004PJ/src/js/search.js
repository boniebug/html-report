const searchFunction = () => {
  const userInput = document.querySelector('.searchBox');
  const searchBox = userInput.value.toLowerCase();
  const possibilities = document.querySelectorAll('#pokemonList .pokemonCard');
  createnoResultDiv();
  const noResultsMessage = document.querySelector('#noResultsMessage');
  if (loadingState) {
    userInput.value = '';
    showPopup('Still Loading... Please wait before searching!');
  } else if (searchBox === '') {
    showAllPokemons(possibilities, noResultsMessage);
  } else {
    filterPokemons(possibilities, searchBox, noResultsMessage);
  }
};

const createnoResultDiv = () => {
  const noResult = document.createElement('p');
  noResult.setAttribute('id', 'noResultsMessage');
  document.body.appendChild(noResult);
}


const filterPokemons = (possibilities, userInputValue, noResultsMessage) => {
  let isFound = false;
  for (const suggestion of possibilities) {
    const suggestionText = suggestion.textContent.toLowerCase();
    if (suggestionText.includes(userInputValue)) {
      suggestion.style.display = 'block';
      isFound = true;
    } else {
      suggestion.style.display = 'none';
    }
  }
  noResultsMessage.style.display = isFound ? 'none' : 'block';
  if (!isFound) {
    noResultsMessage.textContent = 'No Pokémon found';
  }
};

const showAllPokemons = (possibilities, noResultsMessage) => {
  for (const suggestion of possibilities) {
    suggestion.style.display = 'block';
  }
  noResultsMessage.style.display = 'none';
};