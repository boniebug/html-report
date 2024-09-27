'use strict';

const addBookToAllBooks = (newBook) => {
  document.querySelector('.books').appendChild(newBook);
};

const showAllBooksOnSelect = (myLibrary) => {
  removeBooks();
  for (let i = 1; i < myLibrary.length; i++) {
    const newBook = createNewBook(myLibrary[i]);
    document.querySelector('.books').append(newBook);
  }
};

const closePopup = () => {
  const popup = document.querySelector('#popup-container');
  popup.setAttribute('class', 'hide');
  document.querySelector('#new-book-form').reset();
};

const openPopup = () => {
  const popup = document.querySelector('#popup-container');
  popup.setAttribute('class', 'flex');
};

const setEvents = () => {
  const addBookBtn = document.querySelector('#add-book-button');
  const closeformBtn = document.querySelector('#close-button');
  addBookBtn.addEventListener('click', openPopup);
  closeformBtn.addEventListener('click', closePopup);
  const selectCatagory = document.querySelector('#select-category');
  selectCatagory.addEventListener('change', categorize);
};
