'use strict';
const BOOKS = [];
const groupObject = {};

/* Parsing the books data into array 0f objects */

const splitBooksData = () => {
  let bookDetails = [];
  bookDetails = STRING.split('\n');
  return bookDetails;
};

const getHeadings = () => {
  const array = splitBooksData();
  const headings = array[0].split(',');
  return headings;
};

const spiltString = (index) => {
  let book = '';
  const array = [];
  for (let i = 0; i < index.length; i++) {
    if (index[i] === ',' && index[i + 1] !== ' ') {
      array.push(book);
      book = '';
    } else if (i === index.length - 1) {
      book += index[i];
      array.push(book);
      book = '';
    } else {
      book += index[i];
    }
  }
  return array;
};

const createObject = (array) => {
  const object = {};
  const headings = getHeadings();
  for (const index in headings) {
    object[headings[index]] = array[index];
  }
  BOOKS.push(object);
  makeGroups(array);
};

const getBookDetails = () => {
  const Array = splitBooksData();
  Array.shift();
  for (const index of Array) {
    createObject(spiltString(index));
  }
};

const createLendButton = (container) => {
  const lendButton = document.createElement('button');
  container.append(lendButton);
  lendButton.classList.add('lendButton');
  lendButton.innerText = 'Lend';
  lendButtonFunctionality(lendButton);
};

const lendButtonFunctionality = (lendButton) => {
  lendButton.addEventListener('click', () => {
    if (lendButton.innerText === 'Lend') {
      lendButton.innerText = 'Return';
      lendButton.previousElementSibling.innerText = 'Not Available';
      lendButton.previousElementSibling.style.color = 'red';
      lendButton.previousElementSibling.style.borderColor = 'red';
    } else {
      lendButton.innerText = 'Lend';
      lendButton.previousElementSibling.innerText = 'Available';
      lendButton.previousElementSibling.style.color = 'green';
      lendButton.previousElementSibling.style.borderColor = 'green';
    }
  });
};

const createBookDetails = (DetailsContainer, Data, heading) => {
  const bookDetails = document.createElement('p');
  const key = document.createElement('b');
  const value = document.createElement('span');
  DetailsContainer.append(bookDetails);
  key.innerText = `${heading}:`;
  value.id = heading;
  value.innerText = Data;
  bookDetails.append(key, value);
};

const addDataToBookContainer = (bookTitle, object, bookDetails, bookContainer) => {
  const headings = getHeadings();
  bookTitle.id = headings[0];
  bookTitle.innerText = `${object[headings[0]]}`;
  headings.shift();
  for (const key of headings) {
    createBookDetails(bookDetails, object[key], key);
  }
  const available = document.createElement('h5');
  bookContainer.setAttribute('class', 'book');
  bookContainer.append(available);
  createLendButton(bookContainer);
  available.innerText = 'Available';
};

const createDiv = (object, mainContainer) => {
  const bookContainer = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookDetails = document.createElement('div');
  bookContainer.append(bookTitle);
  bookContainer.append(bookDetails);
  addDataToBookContainer(bookTitle, object, bookDetails, bookContainer);
  mainContainer.append(bookContainer);
};

/* Display books */

const displayBooks = () => {
  for (const index of BOOKS) {
    createDiv(index, document.getElementById('mainSection'));
  }
};

/* load Library */

window.onload = () => {
  defineGroupObject();
  getBookDetails();
  createDropDown();
  displayBooks();
  createForm();
  const newBook = document.getElementById('addBook');
  newBook.addEventListener('click', displayForm);
};
