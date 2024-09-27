'use strict'

const creatFormInputs = () => {
  for (let value = 0; value < myLibrary[0].length - 1; value++) {
    const presentValue = myLibrary[0][value];
    const division = document.createElement('div');
    division.className = 'inputs';
    createInputStructure(division, presentValue);
    document.querySelector('#new-book-form').appendChild(division);
  }
};

const createInputStructure = (division, presentValue) => {
  const label = document.createElement('label');
  label.innerText = presentValue + ' : ';
  label.setAttribute('for', `new-book-${presentValue}`);
  const input = document.createElement('input');
  input.setAttribute('required', 'true');
  input.placeholder = `Enter ${presentValue}`;
  input.id = `new-book-${presentValue}`;
  isNumbers(input, presentValue.toLowerCase());
  division.append(label, input);
}

const isNumbers = (input, value) => {
  if (value.includes('year')) {
    input.setAttribute('type', 'number');
  }
};

const addNewBook = (newBook) => {
  myLibrary.push(newBook);
  const presentCategory = document.querySelector('#select-category').value;
  if (presentCategory === 'All Books') {
    addBookToAllBooks(createNewBook(newBook));
  } else {
    addBookToCategory(createNewBook(newBook), newBook[presentCategory]);
  }
};

const fetchFormElements = () => {
  const form = document.querySelector('#new-book-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newBook = {};
    const headerValues = myLibrary[0];
    for (let index = 0; index < headerValues.length - 1; index++) {
      const newValue = headerValues[index];
      const input = document.querySelector(`#new-book-${newValue}`);
      newBook[newValue] = input.value;
    }
    newBook['Availability'] = 'Available';
    addNewBook(newBook);
    closePopup();
  });
};

