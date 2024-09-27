'use strict';

const newPopup =async () => {
  const popup = document.createElement('div');
  popup.classList.add('new-popup-container');
  const popupTitle = createPTag('Books are still loading', 'popup-header');
  popup.appendChild(popupTitle);
  const body = document.querySelector('body');
  body.appendChild(popup);
  const header = document.getElementById('header');
  header.classList.add('disabled');
  const main = document.getElementById('main');
  main.classList.add('disabled');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      closePopup(popup);
    },2000);
    resolve();
  });
};