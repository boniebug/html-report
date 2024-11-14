'use strict';
const parseCSVToObject = function (csvDAta, currentBookDetails) {
  const arrayOfLines = csvDAta.split('\n');
  for (let key = 11; key < arrayOfLines.length; key++) {
    const splittedArray = arrayOfLines[key].split(',');
    const newBook = createEntry(splittedArray[0], splittedArray[1], splittedArray[2], splittedArray[3]);
    currentBookDetails.push(newBook);
  }
};
// General functions
const addFakeImage = () =>    
  'src/images/no-image.png'; 

const clearMain = () => {
  const sectionUnit = document.getElementById('main-section');
  sectionUnit.innerHTML = '';
};

const createEntry = (title, year, genre, author) => {
  const bookEntry = {
    bookTitle: title,
    year: year,
    genre: genre,
    author: author,
    coverPage: addFakeImage(),
    availability: true
  };
  return bookEntry;
};

const createEventListeners = () => {
  const categoriseUnit = document.getElementById('category-unit');
  categoriseUnit.addEventListener('change', (event) => {
    const currentCriteria = event.target.value.toLowerCase();
    filter = currentCriteria;
    console.log(currentCriteria);
    categoriseByFilter(bookDetails, currentCriteria);
    window.scrollTo({
      top: 0,
      behavior: 'instant' 
    });
  });
  const addBookButton = document.getElementById('add-button');
  addBookButton.addEventListener('click', openForm);
  const entrySubmit = document.querySelector('#Submit-button');
  entrySubmit.addEventListener('click', addNewBook);
  const closeFormButton = document.querySelector('#close-button');
  closeFormButton.addEventListener('click', closeForm);
  const minimizeButton = document.querySelector('#minimize-button');
  minimizeButton.addEventListener('click', minimizeForm);
};

let filter = '';

window.onload = () => {
  
  parseCSVToObject(booksDataCSV, bookDetails);
  makeMainSection(bookDetails);
  createEventListeners();
};
