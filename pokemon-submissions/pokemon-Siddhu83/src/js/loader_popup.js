'use strict';

const displayLoader = async () => {
  const loadMessage = createPTag('you are going to pokemon world in few moments...', 'load-message');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';

  parent.appendChild(loadMessage);
  return;
};

const removePopup = popup => {
  const header = document.getElementsByTagName('header')[0];
  header.classList.remove('disabled');

  popup.remove();
};

const createPopup = () => {
  console.log(1234567)
  const popup = createPTag('Kindly wait until the content is loaded', 'wait-popup');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.appendChild(popup);

  const header = document.getElementsByTagName('header')[0];
  header.classList.add('disabled');
  setTimeout(() => {
    removePopup(popup)
  }, 1500);
};
