'use strict';
const categorizeBooksByAuthor = (newStockArray) => {
  const authorNames = [], booksByAuthor = [];
  for (let i = 0; i < newStockArray.length; i++) {
    const book = newStockArray[i], title = book[0], year = book[1], genre = book[2], author = book[3];
    let authorIndex = false;
    for (let j = 0; j < authorNames.length; j++) {
      if (authorNames[j] === author) {
        authorIndex = j;
      }
    }
    if (authorIndex === false) {
      authorNames.push(author);
      booksByAuthor.push([]);
      authorIndex = authorNames.length - 1;
    }
    booksByAuthor[authorIndex].push([title, year, genre, author]);
  }
  return [ authorNames, booksByAuthor ];
};

const createAndAppendBookElements = function (authorNames, booksByAuthor) {
  const oldBooks = document.getElementById('wardrobe');
  for (let i = 0; i < booksByAuthor.length; i++) {
    const books = booksByAuthor[i];
    const author = authorNames[i];
    const authorSection = document.createElement('div');
    authorSection.className = 'authorSection';
    const authorHeading = document.createElement('h2');
    authorHeading.innerText = `Author: ${author}`;
    authorSection.appendChild(authorHeading);
    for (let j = 0; j < books.length; j++) {
      const book = books[j];
      const newDiv = document.createElement('div');
      newDiv.className = 'book';
      oldBooks.appendChild(newDiv);
      createBookDetails(book, newDiv);
    }
  }
};

const createBookDetails = function (book, container) {
  const arr = ['Name', 'Year', 'Genre', 'Author'];
  for (let k = 0; k < 4; k++) {
    const detailsPara = document.createElement('p');
    detailsPara.innerText = `${arr[k]}: ${book[k]}`;
    container.appendChild(detailsPara);
  }
  addAvalivableButton(container);
};

const byAuthor = () => {
  const newStockArray = getNewStockAray();
  clearExistingBooks();
  const [ authorNames, booksByAuthor ] = categorizeBooksByAuthor(newStockArray);
  console.log(booksByAuthor);
  createAndAppendBookElements(authorNames, booksByAuthor);
};
