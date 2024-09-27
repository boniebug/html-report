'use strict';

const getBookInfo = (book) => {
  return {
    name: book.querySelector('h2').innerText,
    year: parseInt(book.querySelector('h3').innerText.split(': ')[1]),
    author: book.querySelector('h3:nth-child(4)').innerText.split(': ')[1],
    genre: book.querySelector('h3:nth-child(3)').innerText.split(': ')[1],
  };
};

const compareBooks = (firstBook, secondBook, selectedOption) => {
  const firstBookInfo = getBookInfo(firstBook);
  const secondBookInfo = getBookInfo(secondBook);
  switch (selectedOption) {
    case 'name':
      return firstBookInfo.name.localeCompare(secondBookInfo.name);
    case 'publishedYear':
      return firstBookInfo.year - secondBookInfo.year;
    case 'author':
      return firstBookInfo.author.localeCompare(secondBookInfo.author);
    case 'genre':
      return firstBookInfo.genre.localeCompare(secondBookInfo.genre);
    default:
      return 0;
  }
};
const booksInArray = () => {
  const ArrayBooks = [];
  const books = document.querySelectorAll('#categoriseBooks section');
  books.forEach((section) => {
    ArrayBooks.push(section);
  });
  return ArrayBooks;
};

const categoriseBookData = () => {
  const categoriseOption = document.getElementById('categoriseOption');
  const booksData = booksInArray();
  if (categoriseOption.value !== 'default') {
    booksData.sort((firstBook, secondBook) => compareBooks(firstBook, secondBook, categoriseOption.value)); 
    document.querySelector('#categoriseBooks').style.display = 'flex';
    document.querySelector('#defaultBooks').style.display = 'none';
    document.querySelector('#categoriseBooks').innerText = "";
    booksData.forEach((book) => {
      document.querySelector('#categoriseBooks').appendChild(book);
    });
  } else {
    document.querySelector('#defaultBooks').style.display = 'flex';
    document.querySelector('#categoriseBooks').style.display = 'none';
  }
};
