'use strict';

const createSection = (category) => {
  const categoryDiv = document.createElement('div');
  const categoryName = document.createElement('h2');
  categoryName.className = 'categoryName';
  categoryName.textContent = category.toUpperCase();
  categoryDiv.id = toCamelCase(category.toLowerCase()).replace(/[.]/g, '');
  categoryDiv.className = 'categoryDiv';
  getElement('libraryContainer').appendChild(categoryName);
  getElement('libraryContainer').appendChild(categoryDiv);
};

const createSectionForCategories = (Categories) => {
  for (const Category of Categories) {
    createSection(Category);
  }
};

// loding the data by index value
const loadData = () => {
  const length = Object.keys(allBooksData).length;
  for (let count = 1; count < length; count++) {
    appendData(allBooksData[`book${count}`], `book${count}`);
  }
};

const createArrayOfCategories = (selectItem) => {
  const Categories = [];
  for (let index = 1; index < Object.keys(allBooksData).length; index++) {
    if (!Categories.includes(allBooksData[`book${index}`][selectItem])) {
      Categories.push(allBooksData[`book${index}`][selectItem]);
    }
  }
  return Categories;
};

const filter = () => {
  removeBooks();
  const filterButton = getElement('filterButton');
  const selectItem = filterButton.value;
  if (selectItem !== 'All') {
    const Categories = createArrayOfCategories(selectItem);
    createSectionForCategories(Categories);
  }
  loadData();
};

// adding new book by details provided in the form

window.onload = () => {
  structuredData();
  loadData();
  addNewBook();
  document.getElementById('addBookButton').addEventListener('click', showForm);
  getElement('filterButton').addEventListener('change', filter);
  getElement('closeForm').addEventListener('click', showForm);
};
