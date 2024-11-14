'use strict';

const appendBookName = (newBookName) => {
  const headerTwo = document.createElement('h2');
  headerTwo.innerText = newBookName;
  return headerTwo;
};

const appendBookData = (newBookInfo, newBookData) => {
  const headerThree = document.createElement('h3');
  headerThree.innerText = newBookInfo + (newBookData ? newBookData : "null");
  return headerThree;
};

const appendBook = (newBookName, newBookYear, newBookGenre, newBookAuthor) => {
  const booksData = document.querySelector('#defaultBooks');
  const newBook = document.createElement('section');
  newBook.appendChild(appendBookName(newBookName));
  newBook.appendChild(appendBookData("Published year: ", newBookYear));
  newBook.appendChild(appendBookData("Genre: ", newBookGenre));
  newBook.appendChild(appendBookData("Author: ", newBookAuthor));
  addingAvaliableBook(newBook);
  document.getElementById('categoriseBooks').appendChild(newBook.cloneNode(true));
  booksData.appendChild(newBook);
};

const appendBookCall = (bookName, newBookInfo) => {
  const bookYear = document.getElementById('bookPublishYear');
  const bookGenre = document.getElementById('bookType');
  const bookAuthor = document.getElementById('authorName');
  appendBook(bookName.value, bookYear.value, bookGenre.value, bookAuthor.value);
  bookName.value = '';
  bookYear.value = '';
  bookGenre.value = '';
  bookAuthor.value = '';
  newBookInfo.style.display = 'none';
};

const getInformation = () => {
  const newBookInfo = document.querySelector('#newBookDetails');
  const bookName = document.getElementById('bookName');
  newBookInfo.style.display = 'flex';
  newBookInfo.addEventListener('submit', (event) => {
    event.preventDefault();
      if (bookName.value) {
        appendBookCall(bookName, newBookInfo);
      }
  });
};