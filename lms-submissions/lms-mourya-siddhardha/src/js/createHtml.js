'use strict';
const makeBookName = (text) => {
  const bookName = document.createElement('p');
  bookName.className = 'book-name';
  bookName.innerText = text;
  return bookName;
};

const makeBookYear = (number) => {
  const year = document.createElement('p');
  year.className = 'published-year';
  year.innerText = 'Year: ' + number;
  return year;
};

const makeBookGenre = (text) => {
  const genre = document.createElement('p');
  genre.className = 'book-genre';
  genre.innerText = 'Genre: ' + text;
  return genre;
};

const makeBookAuthor = (text) => {
  const author = document.createElement('p');
  author.className = 'book-author';
  author.innerText = 'Author: ' + text;
  return author;
};

const makeBookImage = (path) => {
  const bookImage = document.createElement('img');
  bookImage.className = 'book-image';
  bookImage.src = path;
  return bookImage;
};

const makeDetailsDivision = (element) => {
  const detailsDivivsion = document.createElement('div');
  detailsDivivsion.className = 'book-details';
  const bookName = makeBookName(element['bookTitle']);
  const year = makeBookYear(element['year']);
  const genre = makeBookGenre(element['genre']);
  const author = makeBookAuthor(element['author']);
  detailsDivivsion.append(bookName, year, genre, author);
  return detailsDivivsion;
};

const makeFilterUnit = (criterianElement) => {
  const createdDivison = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.innerText = criterianElement;
  legend.className = 'legend-filter';
  createdDivison.appendChild(legend);
  createdDivison.className = 'created-book-unit';
  return createdDivison;
};

const makeMainSection = (booksList, criterianElement = 'All books') => {
  const sectionUnit = document.getElementById('main-section');
  const createdDivison = makeFilterUnit(criterianElement);
  for (const element of booksList) {
    const bookDivivsion = document.createElement('div');
    bookDivivsion.className = 'book-container';
    const bookImage = makeBookImage(element['coverPage']);
    const detailsDivivsion = makeDetailsDivision(element);
    bookDivivsion.append(bookImage, detailsDivivsion);
    bookDivivsion.append(addAvailbilty(element));
    displayAvailability(bookDivivsion.lastChild.lastChild, element);
    createdDivison.append(bookDivivsion);
  }
  sectionUnit.append(createdDivison);
};