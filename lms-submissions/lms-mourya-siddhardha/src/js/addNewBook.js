'use strict';
const createNewBook = (currentBookDetails) => {
  const inputTitle = document.getElementById('name').value;
  const inputGenre = document.getElementById('genre').value;
  let inputYear = document.getElementById('year').value;
  let inputAuthor = document.getElementById('author').value;
  if (inputTitle !== '' && inputGenre !== '') {
    inputAuthor = inputAuthor === '' ? 'No Author' : inputAuthor;
    inputYear = inputYear === '' ? 'No Year' : inputYear;
    const newBook = createEntry(inputTitle, inputYear, inputGenre, inputAuthor);
    currentBookDetails.push(newBook);
  }
};

const minimizeForm = () => {
  const bookEntryForm = document.querySelector('form');
  const mainContainer = document.querySelector('#main-section');
  bookEntryForm.style.display = 'none';
  mainContainer.style.display = 'flex';
  bookEntryForm.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
  });
};

const closeForm = () => {
  const bookEntryForm = document.querySelector('form');
  bookEntryForm.reset();
  minimizeForm();
};

const openForm = () => {
  const bookEntryForm = document.querySelector('form');
  const mainContainer = document.querySelector('#main-section');
  bookEntryForm.style.display = 'block';
  mainContainer.style.display = 'none';
};

const addNewBook = () => {
  createNewBook(bookDetails);
  closeForm();
  clearMain();
  categoriseByFilter(bookDetails, filter);
};
