 'use strict';
 
const getInputDetails = () => {
  let string = '';
  const inputs = document.querySelectorAll('.input');
  for (let index = 0; index < allBooksData['book0'].length - 1; index++) {
    string += `${inputs[index].value},`;
  }
  return createObject(string);
};

const addNewBook = () => {
  getElement('addBookDetails').addEventListener('submit', (e) => {
    e.preventDefault();
    const bookObject = getInputDetails();
    const length = Object.keys(allBooksData).length;
    allBooksData[`book${length}`] = bookObject;
    getElement('addBookDetails').reset();
    const filterButton = getElement('filterButton').value;
    if (filterButton !== 'All') {
      createSection(bookObject[filterButton]);
    }
    appendData(bookObject, `book${length}`);
    showForm();
  });
};

