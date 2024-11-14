'use strict';

let myLibrary = [];
let newBookId = 1;
const setCategory = () => {
  const selectCategory = document.querySelector('#select-category');
  const headerValues = myLibrary[0];
  headerValues.forEach(category => {
    const newOption = document.createElement('option');
    newOption.value = category;
    newOption.innerText = category;
    selectCategory.append(newOption);
  });
}

const showAllBooks = (booksArray) => {
  for (let i = 1; i < booksArray.length; i++) {
    const newBook = createNewBook(booksArray[i]);
    addBookToAllBooks(newBook);
  }
};

window.onload = () => {
  myLibrary = destructureCsv();
  myLibrary.forEach((book) => {
    book.Availability = 'Available';
  });
  setEvents();
  showAllBooks(myLibrary);
  creatFormInputs();
  fetchFormElements();
  setCategory();
};
