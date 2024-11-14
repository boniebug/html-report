const loader = new Promise((resolve, reject) => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    resolve();
  },5000);
});

const raisePopUp = () => {
  const popUp = document.getElementById('popUp');
  popUp.classList.remove('hide');
  setTimeout(() => {
    popUp.classList.add('hide')
  },2000);
  console.log('popup raised');
};

const togglePopUP = (isDisabled) => {
  const buttons = document.querySelectorAll('.actionButtons');
  buttons.forEach((button) => {
    button.disabled = isDisabled;
    if (!isDisabled) {
      button.removeEventListener('click', raisePopUp);
      button.removeEventListener('mouseenter', raisePopUp);
      return;
    }
    button.addEventListener('click', raisePopUp);
    button.addEventListener('mouseenter', raisePopUp);
    // button.
  });
};

const addFunctionality = () => {
  const select = document.getElementById('group-by');
  select.addEventListener('change', () => groupAndRenderBooks(true));
  const addButton = document.querySelector('.add-book-button');
  addButton.addEventListener('click',() => showAddBookPopup());
}

window.onload = () => {
  addHomePageActions();
  togglePopUP(true);
  // main();
  loader
        .then(() => load(booksCSVData))
        .then(() => render())
        .then(() => togglePopUP(false))
        .then(addFunctionality)
        .catch((error) => console.error(error))
}