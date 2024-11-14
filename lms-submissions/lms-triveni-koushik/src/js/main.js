'use strict';
const otherDetails = function (section, bookData) {
  for (let index = 1; index < bookData.length; index++) {
    const p = document.createElement('p');
    let str = (index - 3) ? '' : 'Author: ';
    p.innerText = (str + bookData[index]);
    section.append(p);
  }
};

const addBook = function (bookData, storageArea) {
  const section = document.createElement('section');
  const button = document.createElement('button');
  button.innerText = 'Lend';
  section.append(button);
  const h3 = document.createElement('h3');
  h3.innerText = bookData[0];
  section.append(h3);
  otherDetails(section, bookData);
  storageArea.append(section);
};

const createContainer = function (data) {
  const main = document.querySelector('main');
  const h2 = document.createElement('h2');
  h2.innerText = (data.charAt(0).toLowerCase() + data.slice(1));
  const div = document.createElement('div');
  div.classList.add('storageArea', data.toLowerCase());
  main.append(h2, div);
  return div;
};

const removeSpaces = function (string) {
  let result = '';
  for (let index = 0; index < (string.split(' ')).length; index++) {
    result += (string.split(' '))[index];
  }
  return result;
};

const returnCategorisedDiv = function (data) {
  (data.length) ? data : data = 'MT';
  data = removeSpaces(data);
  let storageArea = document.getElementsByClassName(data.toLowerCase());
  if (storageArea.length) {
    storageArea = storageArea[0];
  } else {
    storageArea = createContainer(data);
  }
  return storageArea;
};

const categoriseBooks = function (books, categoriseItem) {
  for (let index = 0; index < books.length; index++) {
    const categoriseItemData = (books[index].innerText).split(`${categoriseItem}: `);
    const div = returnCategorisedDiv(categoriseItemData[categoriseItemData.length - 1]);
    div.append(books[index].parentNode);
  }
};

const removeFormData = function (userInput) {
  document.getElementById('bookInputs').style.display = 'none';
  for (let index = 0; index < userInput.length; index++) {
    userInput[index].value = '';
  }
};

const userInput = function () {
  let storageArea = document.querySelector('.storageArea');
  const userInput = document.getElementsByClassName('details');
  let userDataValues = [];
  for (let i = 0; i < userInput.length; i++) {
    userDataValues.push(userInput[i].value)
  }
  const categoriseItem = document.getElementById('categoriseOptions').value;
  if (categoriseItem === 'Genre') {
    storageArea = returnCategorisedDiv(userDataValues[2]);
  } else if (categoriseItem === 'Author') {
    storageArea = returnCategorisedDiv(userDataValues[3]);
  }
  addBook(userDataValues, storageArea);
  removeFormData(userInput);
};

const lend = function (event) {
  const target = event.target;
  if (target.matches('button')) {
    if (target.innerText === 'Lend') {
      target.innerText = 'return';
      target.style.backgroundColor = 'darkRed';
      (target.parentNode).style.backgroundColor = 'rgba(0, 0, 0, 0.500)';
    } else {
      target.style.backgroundColor = 'green';
      target.innerText = 'Lend';
      (target.parentNode).style.backgroundColor = 'white';
    }
  }
};

const unCategorise = function (books) {
  const div = document.createElement('div');
  div.classList.add('storageArea');
  document.querySelector('main').append(div);
  for (let index = 0; index < books.length; index++) {
    div.append(books[index]);
  }
};

const removePerviousData = function (childs) {
  for (let index = 0; index < childs.length; index++) {
    childs[index].remove();
  }
};

const collectingBooks = function () {
  const categoriseItem = document.getElementById('categoriseOptions').value;
  let books = document.querySelectorAll('.storageArea section');
  if (categoriseItem === 'Genre') {
    books = document.querySelectorAll('.storageArea section p:nth-last-child(2)');
  } else if (categoriseItem === 'Author') {
    books = document.querySelectorAll('.storageArea section p:nth-last-child(1)');
  }
  const headings = document.querySelectorAll('main h2');
  removePerviousData(headings);
  const containers = document.querySelectorAll('main .storageArea');
  removePerviousData(containers);
  (categoriseItem === 'All')?unCategorise(books):categoriseBooks(books, categoriseItem);
};

window.onload = function () {
  const storageArea = document.querySelector('.storageArea');
  let books200 = booksData.split('\n');
  for (let index = 0; index < books200.length; index++) {
    addBook(books200[index].split(','), storageArea);
  }
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', userInput);
  document.querySelector('main').addEventListener('click', lend);
  document.getElementById('categoriseOptions').addEventListener('change', collectingBooks);
};

const toggleBookInputs = function () {
  const addBookButton = document.getElementById('bookInputs');
  if (addBookButton.style.display === 'block') {
    addBookButton.style.display = 'none';
  } else {
    addBookButton.style.display = 'block';
  }
};
