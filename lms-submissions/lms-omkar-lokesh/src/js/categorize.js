'use strict';

const createCategoryStructure = (category) => {
  const categoryContainer = document.createElement('section');
  const categoryName = document.createElement('h1');
  const categoryBooks = document.createElement('div');
  categoryContainer.setAttribute('class', 'category-container');
  categoryName.innerText = category.toUpperCase();
  const id = 'a' + category.replace(/[:'&. ]/gi, '');
  categoryBooks.setAttribute('id', id.toLowerCase());
  categoryBooks.setAttribute('class', 'individual-category');
  categoryContainer.append(categoryName, categoryBooks);
  return categoryContainer;
};

const createNewCategory = (newCategory) => {
  const newCategoryElement = createCategoryStructure(newCategory);
  document.querySelector('#books-wraper').appendChild(newCategoryElement);
};

const addBookToCategory = (newBook, newCategory) => {
  const id = 'a' + newCategory.replace(/[:'&. ]/gi, '');
  const isCategoryCreated = document.querySelector(`#${id.toLowerCase()}`);
  if (!isCategoryCreated) {
    createNewCategory(newCategory);
  }
  document.querySelector(`#${id.toLowerCase()}`).appendChild(newBook);
};

const removeBooks = () => {
  newBookId = 1;
  document.querySelector('.books').innerText = '';
  document.querySelectorAll('.category-container').forEach((category) => {
    category.remove();
  });
};

const categorize = () => {
  removeBooks();
  const categoryValue = document.querySelector('#select-category').value;
  if (categoryValue === 'All Books') {
    showAllBooksOnSelect(myLibrary);
  } else {
    for (let i = 1; i < myLibrary.length; i++) {
      const newBook = createNewBook(myLibrary[i]);
      const newCategory = newBook.querySelector(`.${categoryValue}`).innerText;
      addBookToCategory(newBook, newCategory);
    }
  }
};