'use strict';

const closeNewBookWindow = () => {
  const bookInfo = document.querySelector('#newBookDetails');
  bookInfo.style.display = 'none';
}

window.onload = () => {
  initializeBooks();
  const closeNewBook = document.querySelector('#closeNewBookWindow')
  const addBook = document.querySelector('#addingBook');
  const searchBar = document.getElementById('searchBookName');
  const categorise = document.querySelector('#categoriseButton');
  categorise.addEventListener('click', categoriseBookData);
  addBook.addEventListener('click', getInformation);
  searchBar.addEventListener('input', searchBook);
  closeNewBook.addEventListener('click', closeNewBookWindow);
};

window.onclick = (event) => {
  if (event.target === document.querySelector('#newBookDetails')) {
    const closeWindow = document.querySelector('#newBookDetails');
    closeWindow.style.display = 'none';
  }
}