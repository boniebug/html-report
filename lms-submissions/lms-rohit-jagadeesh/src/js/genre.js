'use strict';
const categorizeBooksByGenre = (newStockArray) => {
  const genreNames = [], booksByGenre = [];
  for (let i = 0; i < newStockArray.length; i++) {
    const book = newStockArray[i], title = book[0], year = book[1], genre = book[2], author = book[3];
    let genreIndex = false;
    for (let j = 0; j < genreNames.length; j++) {
      if (genreNames[j] === genre) {
        genreIndex = j;
      }
    }
    if (genreIndex === false) {
      genreNames.push(genre);
      booksByGenre.push([]);
      genreIndex = genreNames.length - 1;
    }
    booksByGenre[genreIndex].push([title, year, genre, author]);
  }
  return booksByGenre;
};

const createAndAppendBookElementss = function(booksByGenre) {
  const oldBooks = document.getElementById('wardrobe');
  for (let i = 0; i < booksByGenre.length; i++) {
    const books = booksByGenre[i];
    for (let j = 0; j < books.length; j++) {
      const book = books[j];
      const newDiv = document.createElement('div');
      newDiv.className = 'book';
      oldBooks.appendChild(newDiv);
      createBookDetailss(book, newDiv);
    }
  }
};

const createBookDetailss = function(book, container) {
  const arr = ['Name', 'Year', 'Genre', 'Author'];
  for (let k = 0; k < 4; k++) {
    const detailsPara = document.createElement('p');
    detailsPara.innerText = `${arr[k]}: ${book[k]}`;
    container.appendChild(detailsPara);
  }
  addAvalivableButton(container);
};

const byGenre = () => {
  const buttonTag = document.getElementById('addBtn');
  buttonTag.addEventListener('click', () => addNewBookToGenre(newStockArray));
  const newStockArray = getNewStockAray();
  clearExistingBooks();
  const booksByGenre = categorizeBooksByGenre(newStockArray);
  console.log(booksByGenre);
  createAndAppendBookElementss(booksByGenre);
};
