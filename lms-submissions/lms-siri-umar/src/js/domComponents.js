'use strict';
const createNewElement = (tag, className, innerText) => {
  const newElement = document.createElement(tag);
  if (innerText) {
    newElement.innerText = innerText;
  }
  if (className) {
    newElement.className = className;
  }
  return newElement;
};

const updateLendStatus = (book, lendBtn, availability, lendDisplay) => {
  book.increaseLendCount();
  book.toggleAvailbility();
  availability.innerText = book.availabilityStatus();
  lendBtn.innerText = book.lendStatus();
  availability.className = book.availabilityStatus();
  lendDisplay.innerText = `Lend Count: ${book.getLendCount()}`
};

const createAvailability = (book) => {
  const available = document.createElement('p');
  available.className = book.availabilityStatus();
  available.innerText = book.availabilityStatus();
  return available;
};

const createLendBtn = (book, availability, myLibrary, lendDisplay) => {
  const lendBtn = document.createElement('button');
  lendBtn.classList = 'secondary-btn';
  lendBtn.innerText = book.lendStatus();
  lendBtn.addEventListener('click', () => {
    updateLendStatus(book, lendBtn, availability, lendDisplay);
  });
  return lendBtn;
};

const createBook = (book, myLibrary) => {
  const bookContainer = document.createElement('div');
  bookContainer.className = 'book-container';
  const availability = createAvailability(book);
  const lendCountText = `Lend Count: ${book.getLendCount()}`
  const lendDisplay = createNewElement('p', '', lendCountText);
  bookContainer.appendChild(createNewElement('h1', 'book-title', book.getTitle()));
  bookContainer.appendChild(createNewElement('p', 'published-year',book.getPublishedYear()));
  bookContainer.appendChild(createNewElement('p', 'book-author',book.getAuthor()));
  bookContainer.appendChild(createNewElement('p', 'book-genre',book.getGenre()));
  bookContainer.appendChild(availability);
  bookContainer.appendChild(lendDisplay);
  bookContainer.appendChild(createLendBtn(book, availability, myLibrary, lendDisplay));
  return bookContainer;
};

const createCategoryHeading = (category) => {
  const categoryHeadingContainer = document.createElement('div');
  const categoryHeading = document.createElement('h2');
  if (category === 'undefined') {
    categoryHeading.innerText = 'All Books';
  } else {
    categoryHeading.innerText = category.charAt(0).toUpperCase() + category.slice(1);
  }
  categoryHeadingContainer.appendChild(categoryHeading);
  return categoryHeadingContainer;
};
