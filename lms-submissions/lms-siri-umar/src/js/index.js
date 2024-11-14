'use strict';

const handleSubmit = () => {
  const name = document.getElementById('name');
  const author = document.getElementById('author');
  const publishedYear = document.getElementById('published-year');
  const genre = document.getElementById('genre');
  const newBook = new Book({
    title: name.value,
    publishYear: publishedYear.value,
    genre: genre.value,
    author: author.value,
  });
  closeModal();
  return newBook;
};

const handleFormSubmit = (myLibrary, currentView) => {
  const newBook = handleSubmit();
  myLibrary.addBook(newBook);
  categorizeBooks(myLibrary, currentView.value);
};

const startEventListners = (myLibrary) => {
  const addButton = document.getElementById('add-book-btn');
  const closeButton = document.getElementById('close-button');
  const submitForm = document.getElementById('submit-form');
  const showPopularBooks = document.getElementById('popular-book-btn');
  addButton.addEventListener('click', appearModal);
  closeButton.addEventListener('click', closeModal);
  const dropDownBtn = document.getElementById('drop-down-btn');
  dropDownBtn.addEventListener('click', () => {
    toggleDropDown(myLibrary);
  });
  submitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormSubmit(myLibrary, myLibrary.currentView);
    submitForm.reset();
  });
  showPopularBooks.addEventListener('click', () => {
    myLibrary.sortBooks();
    categorizeBooks(myLibrary, myLibrary.currentView.value);
  })

};

const categorizeBooks = (myLibrary , categorizeKey = 'none') => {
  const categorizeSection = document.getElementById('categories-section');
  categorizeSection.innerHTML = '';
  const categories = myLibrary.categorizeBooks(categorizeKey);
  Object.keys(categories).forEach((category) => {
    const categoryContainer = createNewElement('section', 'category-container');
    const categorySection = createNewElement('section', 'category-section');
    const categoryHeadingContainer = createCategoryHeading(category);
    categoryContainer.appendChild(categoryHeadingContainer);
    categories[category].forEach((book) => {
      categorySection.appendChild(createBook(book, myLibrary));
    });
    categoryContainer.appendChild(categorySection);
    categorizeSection.appendChild(categoryContainer);
  });
};

const parseBookData = (BOOKS_DATA) => {
  return BOOKS_DATA.split('\n')
    .slice(1)
    .map(bookEntry => {
      const [title, publishYear, genre, author] = bookEntry.split(',');
      return { title, publishYear, genre, author };
    });
};

const addBooksToLibrary = (myLibrary, BOOKS_DATA) => {
  const parsedBooks = parseBookData(BOOKS_DATA);
  parsedBooks.forEach((bookData) => {
    myLibrary.addBook(bookData);
  });
};

const startLibrary = () => {
  const myLibrary = new Library();
  addBooksToLibrary(myLibrary, BOOKS_DATA);
  categorizeBooks(myLibrary);
  startEventListners(myLibrary);
};

window.onload = startLibrary;
