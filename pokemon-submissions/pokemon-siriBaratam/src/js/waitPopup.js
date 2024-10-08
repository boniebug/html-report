'use strict'
const removeWaitPopup = (popup) => {
  popup.style.display = 'none';
  const search = document.getElementById('search');
  search.removeEventListener('click', () => { showWaitPopup(popup) });
};

const waitPopupAction = (popup) => {
  const search = document.getElementById('search');
  search.addEventListener('click', () => { showWaitPopup(popup) });
};

const showWaitPopup = popup => {
  const body = document.body;
  body.appendChild(popup);
  setTimeout(()=>{
    body.removeChild(popup);
  },2000)
};

const createWaitPopup = () => {
  const popup = document.createElement('div');
  popup.classList.add('popup-container');
  const firstMessage = document.createElement('p')
  firstMessage.innerText = 'Pokemons are still loading';
  const secondMessage = document.createElement('p')
  secondMessage.innerText = 'Please Wait';
  popup.appendChild(firstMessage);
  popup.appendChild(secondMessage);
  return popup;
};
