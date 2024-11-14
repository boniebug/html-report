'use strict';

const toCamelCase = (string) => {
  const camelCase = string.toLowerCase();
  return camelCase.replace(/ ./g, mattch => mattch[1].toUpperCase());
};

const getElement = (id) => {
  return document.getElementById(id);
};

const splitDetails = (bookDetails) => {
  const splitedData = [];
  let fetchedValues = '';
  for (let i = 0; i < bookDetails.length; i++) {
    if (bookDetails[i] === ',' && bookDetails[i + 1] !== ' ') {
      splitedData.push(fetchedValues);
      fetchedValues = '';
    } else if (bookDetails[i] !== '"') {
      fetchedValues += bookDetails[i];
    }
  }
  splitedData.push(fetchedValues);
  return splitedData;
};

const removeBooks = () => {
  const container = getElement('libraryContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const showForm = () => {
  const isformDisplay = getElement('addNewBook').style.display === 'none';
  getElement('addNewBook').style.display = isformDisplay ? 'flex' : 'none';
};
