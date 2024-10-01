'use strict';

const createCloseButton = (popup) => {
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('close-btn');
  closeButton.onclick = () => hidePopup(popup);
  return closeButton;
};

const createPopup = (content, className = 'popup-message', autoHide = false, hideTime = 2000) => {
  if (document.getElementById(className)) return;

  const popup = createNewElement('dialog', className);
  popup.id = className;

  if (typeof content === 'string') {
    const message = createNewElement('p', '', content);
    popup.appendChild(message);
  } else {
    popup.appendChild(content);
  }

  const closeButton = createCloseButton(className);
  popup.appendChild(closeButton);

  document.body.appendChild(popup);

  if (autoHide) {
    setTimeout(() => {
      hidePopup(className);
    }, hideTime);
  }
  return popup;
};

const hidePopup = (popupId = 'popup-message') => {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.close();
    popup.remove();
  }
};

const showLoadingPopup = () => {
  const loadingPopup = createPopup('Content is still loading...', 'loading-popup', true);
  loadingPopup.showModal();
};

