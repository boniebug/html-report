'use strict';

const isLended = (isLend) => {
  if (isLend.classList.contains('lend')) {
    isLend.innerText = 'LEND';
    isLend.classList.remove('lend');
  } else {
    isLend.innerText = 'RETURN';
    isLend.classList.add('lend');
  }
};

const setBookName = (bookName, bookDetailsSection) => {
  const h3Name = document.createElement('h3');
  h3Name.innerText = 'Book Name:';
  const divName = document.createElement('div');
  divName.innerText = bookName;
  divName.setAttribute('class', 'name');
  bookDetailsSection.append(h3Name, divName);
};

const setPublishedYear = (publishedYear, bookDetailsSection) => {
  const h3PublishedYear = document.createElement('h3');
  h3PublishedYear.innerText = 'Published Year:';
  const divPublishedYear = document.createElement('div');
  divPublishedYear.innerText = publishedYear;
  divPublishedYear.setAttribute('class', 'year');
  bookDetailsSection.append(h3PublishedYear, divPublishedYear);
};

const setGenre = (genre, bookDetailsSection) => {
  const h3Genre = document.createElement('h3');
  h3Genre.innerText = 'Genre:';
  const divGenre = document.createElement('div');
  divGenre.innerText = genre;
  divGenre.setAttribute('class', 'genre');
  bookDetailsSection.append(h3Genre, divGenre);
};

const setAuthor = (author, bookDetailsSection) => {
  const h3Author = document.createElement('h3');
  h3Author.innerText = 'Author:';
  const divAuthor = document.createElement('div');
  divAuthor.innerText = author;
  divAuthor.setAttribute('class', 'author');
  bookDetailsSection.append(h3Author, divAuthor);
};

const returnIsAvailable = () => {
  const h3Available = document.createElement('h3');
  h3Available.innerText = 'LEND';
  h3Available.setAttribute('class', 'available');
  h3Available.setAttribute('onClick', 'isLended(this)');
  return h3Available;
};

const addABookDetailsToDocument = (bookName, publishedYear, genre, author) => {
  const booksContainer = document.querySelector('#books-container');
  const bookSection = document.createElement('section');
  bookSection.setAttribute('class', 'book-section');
  const bookDetailsSection = document.createElement('section');
  bookDetailsSection.setAttribute('class', 'book-details');
  setBookName(bookName, bookDetailsSection);
  setPublishedYear(publishedYear, bookDetailsSection);
  setGenre(genre, bookDetailsSection);
  setAuthor(author, bookDetailsSection);
  const bookIsAvailableSection = returnIsAvailable();
  bookSection.append(bookDetailsSection, bookIsAvailableSection);
  booksContainer.appendChild(bookSection);
};

const resetTheForm = () => {
  document.querySelector('.add-book-form').reset();
};

const openForm = (addBookForm, formBackground, body) => {
  addBookForm.classList.add('form-display');
  formBackground.classList.add('form-background-display');
  body.classList.add('no-scroll');
};

const closeForm = (addBookForm, formBackground, body) => {
  addBookForm.classList.remove('form-display');
  formBackground.classList.remove('form-background-display');
  body.classList.remove('no-scroll');
};

const getAllCSVData = () => {
  const seperateByNewLine = booksInformation.split('\n');
  const seperateByCommas = [];
  for (let index = 0; index < seperateByNewLine.length; index++) {
    seperateByCommas.push(seperateByNewLine[index].split(','));
  }
  return seperateByCommas;
};

const addBooksDetailsToDocument = () => {
  const booksInfo = getAllCSVData();
  for (let index = 1; index < booksInfo.length; index++) {
    addABookDetailsToDocument(booksInfo[index][0], booksInfo[index][1], booksInfo[index][2], booksInfo[index][3]);
  }
};

const addABookInfoWhenCategorised = (bookName, publishedYear, genre, author, appendPlace) => {
  const bookSection = document.createElement('section');
  bookSection.setAttribute('class', 'book-section');
  const bookDetailsSection = document.createElement('section');
  bookDetailsSection.setAttribute('class', 'book-details');
  setBookName(bookName, bookDetailsSection);
  setPublishedYear(publishedYear, bookDetailsSection);
  setGenre(genre, bookDetailsSection);
  setAuthor(author, bookDetailsSection);
  const bookIsAvailableSection = returnIsAvailable();
  bookSection.append(bookDetailsSection, bookIsAvailableSection);
  appendPlace.after(bookSection);
};

const getCategoriseMode = (bookName, publishedYear, genre, author) => {
  const categorisedByWhat = document.querySelector('.categorised-by-heading').getAttribute('id');
  switch (categorisedByWhat) {
    case 'bookName':
      return bookName;
      break;
    case 'publishedYear':
      return publishedYear;
      break;
    case 'genre':
      return genre;
      break;
    case 'author':
      return author;
      break;
    default:
      console.error('Yoo, there is a problem');
      break;
  }
};

const addANewBookWhenCategorised = (bookName, publishedYear, genre, author, categoryHeading) => {
  let isFound = false;
  const mode = getCategoriseMode(bookName, publishedYear, genre, author);
  for (const aCategoryHeading of categoryHeading) {
    const categoryHeadingText = aCategoryHeading.innerText.toLowerCase();
    if (categoryHeadingText === mode.toLowerCase()) {
      addABookInfoWhenCategorised(bookName, publishedYear, genre, author, aCategoryHeading);
      isFound = true;
    }
  }
  if (!isFound) {
    appendCategoryHeading(mode);
    addABookDetailsToDocument(bookName, publishedYear, genre, author);
  }
};

const addBookDetails = () => {
  const bookName = document.querySelector('#book-name').value;
  const publishedYear = document.querySelector('#published-year').value;
  const genre = document.querySelector('#genre').value;
  const author = document.querySelector('#author').value;
  const categoryHeading = document.querySelectorAll('.category-heading');
  if (categoryHeading.length > 0) {
    addANewBookWhenCategorised(bookName, publishedYear, genre, author, categoryHeading);
  } else {
    addABookDetailsToDocument(bookName, publishedYear, genre, author);
  }
  resetTheForm();
};

const formOnSubmit = (event) => {
  event.preventDefault();
  const body = document.querySelector('body');
  const formBackground = document.querySelector('.form-background');
  body.classList.remove('no-scroll');
  event.target.classList.remove('form-display');
  formBackground.classList.remove('form-background-display');
  addBookDetails();
};
