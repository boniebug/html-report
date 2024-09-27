'use strict';


const addButtons = (element, book) => {
  const available = document.createElement('p');
  available.classList.add('green');
  book.classList.add('available');
  available.innerText= 'Available';
  const lendButton = document.createElement('button');
  lendButton.innerText = 'Lend Book';
  lendButton.classList.add('lendButton');
  lendButton.addEventListener('click', () => toggleAvailable(lendButton, available, book));
  element.append(available, lendButton);
};


const createTitle = (bookTitle) => {
  const title = document.createElement('div');
  title.innerText = bookTitle;
  title.setAttribute('class', 'bookTitle');
  return title;
};

const createAuthor= (bookAuthor) => {
  const auther = document.createElement('div');
  auther.innerText = bookAuthor;
  auther.setAttribute('class', 'bookAuthor');
  return auther;
};

const createPublishYear = (publishYear) => {
  const year = document.createElement('h4');
  year.setAttribute('class', 'year');
  year.innerText = publishYear;
  return year;
};

const createGenre = (bookGenre) => {
  const genre = document.createElement('h4');
  genre.innerText = bookGenre;
  genre.setAttribute('class', 'genre');
  return genre;
};

const createAvailability = (book) => {
  const bookInfo = document.createElement('div');
  bookInfo.setAttribute('class', 'aboutBook');
  addButtons(bookInfo, book);
  return bookInfo;
};

const createDetails = (bookValues) => {
  const year = createPublishYear(bookValues.year);
  const author = createAuthor(bookValues.author);
  const genre = createGenre(bookValues.genre)
  const bookDetails = document.createElement('div');
  bookDetails.append(author, year, genre);
  bookDetails.classList.add('details');
  return bookDetails;
};


const divisionAvailability = () => {
  const division = document.querySelector('.division');
  let isCategoryOn = false;
  if (division !== null) {
    isCategoryOn = true;
  }
  return isCategoryOn;
};

const addBook = (event) => {
  event.preventDefault();
  const titleValue = document.querySelector('#title').value;
  const authorValue = document.querySelector('#name').value;
  const publishYearValue = document.querySelector('#year').value;
  const infoValue= document.querySelector('#genre').value.toLowerCase();
  const bookValues = { title: titleValue, year: publishYearValue, genre: infoValue, author:authorValue };
  const isCategoryOn = divisionAvailability();
  appendBook(bookValues, isCategoryOn);
  toggleModal();
  document.querySelector('.addDetails').reset();
};

const createBook = (bookValues) => {
  const book = document.createElement('div');
  book.classList.add('book');
  const title = createTitle(bookValues.title);
  const details = createDetails(bookValues);
  const Availability = createAvailability(book);
  book.append(title, details, Availability);
  return book;
};

const appendToContainer = (book) => {
  const container = document.querySelector('.booksContainer');
  container.classList.add('booksGrid');
  container.appendChild(book);
};

const appendBook =(bookValues, isCategoryOn) => {
  const book = createBook(bookValues);
  if (isCategoryOn === false) {
    appendToContainer(book);
  } else {
    const category = document.querySelector('.division').classList[1];
    const divisionType = category.slice(0, category.length - 4);
    appendToInfo(book, divisionType);
  }
};


const getInfo = () => {
  const divisions = document.querySelectorAll('.division');
  let genre = [];
  for (let index in divisions) {
    genre.push(divisions[index].id);
  }
  return genre;
}; 

const createDivision = (divisionName, category) => {
  const division = document.createElement('div');
  const divisionTitle = document.createElement('h1');
  const booksGrid = document.createElement('div');
  booksGrid.classList.add('booksGrid');
  divisionTitle.classList.add('infoTitle');
  divisionTitle.innerText = divisionName;
  division.id = divisionName;
  division.append(divisionTitle, booksGrid);
  const infoType = category + '-div';
  division.classList.add('division', infoType);
  const container = document.querySelector('.booksContainer');
  container.appendChild(division);
};

const appendToDivision = (book, divisions, divisionName, category) => {
  if (divisions.includes(divisionName) === false) {
    createDivision(divisionName, category);
  }
  const booksGrid = document.getElementById(divisionName).lastChild;
  booksGrid.appendChild(book);
};

//book - book card, divisions - to check if the division already exists, 
//info -the value of division title (fantasy, adventure, j.k.rowling ..),
// category - on which basis we are categorizing (genre / author)
const appendToInfo = (book, category) => {
  if (category !== 'random') {
    const divisions = getInfo();
    const info = book.getElementsByClassName(category)[0].innerText.toLowerCase();
    appendToDivision(book, divisions, info, category);
  } else {
    appendToContainer(book);
  }
};

const categorizeBooks = (category) => {
  const books = document.querySelectorAll('.book');
  const container = document.querySelector('.booksContainer');
  container.innerText = '';
  container.classList.remove('booksGrid');
  books.forEach((book) => appendToInfo(book, category));
};

const addDropdownEvents = () => {
  document.getElementById('randomCategorize').addEventListener('click',
    () => categorizeBooks('random')
  );
  document.getElementById('genreCategorize').addEventListener('click',
    () => categorizeBooks('genre')
  );
  document.getElementById('authorCategorize').addEventListener('click',
    () => categorizeBooks('bookAuthor')
  );
  document.getElementById('yearCategorize').addEventListener('click',
    () => categorizeBooks('year')
  );
};


window.onload = () => {
  const addBookForm = document.querySelector('.addDetails');
  addBookForm.addEventListener('submit', addBook);
  addDropdownEvents();
  addModalToggle();
  fetchData(data);
};
