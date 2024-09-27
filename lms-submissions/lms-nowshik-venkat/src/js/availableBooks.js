'use strict';

const bookAvailable = (buttonToIncrease, buttonToDecrease, divTag, textAreaTag) => {
  let value = 1;
  buttonToIncrease.onclick = () => {
    textAreaTag.innerText = "Avaliable Books: " + ((value < 1 && value < 2) ? ++value : value);
    buttonToIncrease.setAttribute('disabled', '');
    buttonToDecrease.removeAttribute('disabled');
  };
  textAreaTag.innerText = "Avaliable Books: 1";
  buttonToIncrease.innerText = 'Return';
  divTag.appendChild(textAreaTag);
  divTag.appendChild(buttonToIncrease);
};
  
const bookUnavailable = (buttonToIncrease, buttonToDecrease, divTag, textAreaTag) => {
  let value = 1;
  buttonToDecrease.onclick = () => {
    textAreaTag.innerText = "Avaliable Books: " + ((value > 0) ? --value : value);
    buttonToDecrease.setAttribute('disabled', '')
    buttonToIncrease.removeAttribute('disabled');
  };
  buttonToDecrease.innerText = 'Lend';
  divTag.appendChild(buttonToDecrease);
};
  
const addingAvaliableBook = (newBook) => {
  const divTag = document.createElement('div');
  divTag.setAttribute('class', 'avaliableBooks');
  const buttonToIncrease = document.createElement('button');
  const textAreaTag = document.createElement('h4');
  const buttonToDecrease = document.createElement('button');
  buttonToIncrease.setAttribute('disabled', '')
  bookAvailable(buttonToIncrease, buttonToDecrease, divTag, textAreaTag);
  bookUnavailable(buttonToIncrease, buttonToDecrease, divTag, textAreaTag);
  newBook.appendChild(divTag);
};