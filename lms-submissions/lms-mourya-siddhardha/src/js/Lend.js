const displayAvailability = (triggeredButton, currentBook) => {
  if (currentBook['availability']) {
    triggeredButton.previousSibling.innerText = 'book is available';
    triggeredButton.innerText = 'lend book';
    triggeredButton.parentNode.parentNode.style.backgroundColor = 'white';
  }
  else {
    triggeredButton.previousSibling.innerText = 'book is unavailable';
    triggeredButton.innerText = 'take back';
    triggeredButton.parentNode.parentNode.style.backgroundColor = 'rgb(255, 233, 233)';
  }
};

const changeAvailability = (currentButton, currentBook) => {
  currentBook['availability'] = !currentBook['availability'];
  displayAvailability(currentButton, currentBook);
};

const createButton = (element) => {
  const button = document.createElement('button');
  button.id = 'lend';
  button.className = 'clickable-buttons';
  button.innerText = 'lend book';
  button.addEventListener('click', () => {
    changeAvailability(button, element);
  });
  return button;
};

const addAvailbilty = (element) => { // element is just to pass until changeAvailabilty
  const checkDivivsion = document.createElement('div');
  checkDivivsion.className = 'check-division';
  const lendButton = createButton(element);
  const message = document.createElement('span');
  message.className = 'availability-message';
  message.innerText = 'book is available';
  checkDivivsion.append(message, lendButton);
  return checkDivivsion;
};
