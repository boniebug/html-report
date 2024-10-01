'use strict';

const displayLoader = async () => {
  const loadMessage = createPTag('you are going to pokemon world in few moments...', 'load-message');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';

  parent.appendChild(loadMessage);
  return;
};

const createPopup = () => {
  const popup = createPTag('Kindly wait until the content is loaded', 'wait-popup');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.appendChild(popup);

  setTimeout(() => {
    popup.remove()
  }, 1500);
};
