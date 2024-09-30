const createCloseButton = (popup) => {
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('close-btn');
  closeButton.onclick = () => popup.close();
  return closeButton;
};

const showPopup = (popupMessage) => {
  if (document.getElementById('popup-message')) return;

  const loadingPopup = document.createElement('dialog');
  loadingPopup.id = 'popup-message';
  loadingPopup.classList.add('popup-message');

  const message = document.createElement('p');
  message.innerText = popupMessage;
  loadingPopup.appendChild(message);

  const closeButton = createCloseButton(loadingPopup);
  loadingPopup.appendChild(closeButton);

  document.body.appendChild(loadingPopup);
  loadingPopup.showModal();

  setTimeout(() => {
    hidePopup();
  }, 2000);
};

const hidePopup = () => {
  const loadingPopup = document.getElementById('popup-message');
  if (loadingPopup) {
    loadingPopup.close();
    loadingPopup.remove();
  }
};

const showLoadingPopup = () => {
  showPopup('Content is still loading...');
};

const createPokemonDetailsPopup = (pokemon) => {
  const detailsPopup = document.createElement('dialog');
  detailsPopup.classList.add('popup-details');

  const content = createPokemonDetailsContent(pokemon);
  const closeButton = createCloseButton(detailsPopup);

  detailsPopup.appendChild(content);
  detailsPopup.appendChild(closeButton);

  document.body.appendChild(detailsPopup);

  return detailsPopup;
};