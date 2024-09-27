'use strict';

const isTypeIncluded = (typesArray, inputText) => {
  let status = false;
  for (const type of typesArray) {
    status = status || type.includes(inputText);
  }
  return status;
};

const performSearch = (event) => {
  const inputText = event.target.value;
  if (inputText) {
    const matchedElements = [];
    for (const element of POKEMON) {
      if (element.name.includes(inputText) ||
        isTypeIncluded(element.type, inputText) ||
        element.id == inputText) {
        matchedElements.push(element);
      }
    }
    displayPokemons(matchedElements);
    return;
  }
  displayPokemons(POKEMON); // when the search input text has nothing
};
