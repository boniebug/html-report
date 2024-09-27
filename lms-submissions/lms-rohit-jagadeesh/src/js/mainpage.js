'use strict';
window.onload = () => {
  addNewStock();
  document.querySelector('#newBook').addEventListener('click', displayForm);
  document.querySelector('.hideDiv').addEventListener('submit', addNewBook);
  document.querySelector('.closeButton').addEventListener('click', closeForm);
  document.querySelector('#categorizeButton').addEventListener('click', handleSelectChange)
};

const defaultBooks = () => {
  const newStockArray = getNewStockAray();
  clearExistingBooks();
  addBooks(newStockArray);
};

const handleSelectChange = (event) => {
  const value = event.target.value;
  switch(value) {
      case 'default':
        defaultBooks();
          break;
      case 'author':
        byAuthor();
          break;
      case 'genre':
        byGenre();
        break;
  }
};

const closeForm = function () {
  const hideDiv = document.querySelector('.hideDiv');
  hideDiv.style.display = 'none';
};

const displayForm = () => {
  const form = document.querySelector('.hideDiv');
  form.style.display = (form.style.display === 'block') ? 'none' : 'block';
};

const clearForm = function () {
  document.querySelector('.bookname').value = "";
  document.querySelector('.genre').value = "";
  document.querySelector('.year').value = "";
  document.querySelector('.author').value = "";
}

const addNewBook = (event) => {
  event.preventDefault();
  const title = document.querySelector('.bookname').value;
  const genre = document.querySelector('.genre').value;
  const year = document.querySelector('.year').value;
  const author = document.querySelector('.author').value;
  const arr1 = [title, year, genre, author];
  const arr2 = ['Name', 'Year', 'genre', 'author'];
  const bookItem = addnewBookDetails(arr1, arr2);
  const bookList = document.getElementById('wardrobe');
  bookList.appendChild(bookItem);
  displayForm();
  clearForm();
};

const addAnotherBook = (newStockArray) => {
  const title = document.querySelector('.bookname').value;
  const genre = document.querySelector('.genre').value;
  const year = document.querySelector('.year').value;
  const author = document.querySelector('.author').value;
  const arr1 = [title, year, genre, author];
  return arr1;
};

const addnewBookDetails = (arr1, arr2) => {
  const bookItem = document.createElement('div');
  bookItem.className = 'book';
  for (let index = 0; index < 4; index++) {
    const para = document.createElement('p');
    para.innerText = `${arr2[index]} : ${arr1[index]}`;
    bookItem.appendChild(para);
  }
  addAvalivableButton(bookItem);
  return bookItem;
};

const addNewStock = () => {
  const newStockArray = [];
  const SplitingArrays = newStock.split('\n');
  for (let index = 0; index < SplitingArrays.length; index++) {
    const splitingIndex = SplitingArrays[index].split(',');
    newStockArray.push(splitingIndex);
  }
  addBooks(newStockArray);
};

const getNewStockAray = () => {
  const newStockArray = [];
  const SplitingArrays = newStock.split('\n');
  for (let index = 0; index < SplitingArrays.length; index++) {
    const splitingIndex = SplitingArrays[index].split(',');
    newStockArray.push(splitingIndex);
  }
  return newStockArray;
};

const addBooks = (newStockArray) => {
  for (let index = 0; index < newStockArray.length; index++) {
    const newDiv = document.createElement('div');
    newDiv.className = 'book';
    const oldBookClass = document.getElementById('wardrobe');
    oldBookClass.appendChild(newDiv);
    const arr = ['Name', 'Year', 'Genre', 'Author'];
    for (let j = 0; j < 4; j++) {
      const detailsPara = document.createElement('p');
      detailsPara.innerText = `${arr[j]} : ${newStockArray[index][j]}`;
      newDiv.appendChild(detailsPara);
    }
    addAvalivableButton(newDiv);
  }
};

const addAvalivableButton = function (newDiv) {
  const availabilityPara = document.createElement('p');
  availabilityPara.className = 'available';
  availabilityPara.innerText = 'AVAILABLE';
  newDiv.appendChild(availabilityPara);
  const button = document.createElement('button');
  button.innerText = 'Lend';
  button.className = 'lendButton';
  newDiv.appendChild(button);
  button.addEventListener('click', () => toggleLendReturn(button, availabilityPara));
}

const toggleLendReturn = (button, availabilityPara) => {
  if (availabilityPara.classList.contains('available')) {
    availabilityPara.innerText = 'UNAVAILABLE';
    button.innerText = 'Return';
    availabilityPara.classList.remove('available');
    availabilityPara.classList.add('unavailable');
  } else {
    availabilityPara.innerText = 'AVAILABLE';
    button.innerText = 'Lend';
    availabilityPara.classList.remove('unavailable');
    availabilityPara.classList.add('available');
  }
};

const clearExistingBooks = () => {
  const books = [];
  const bookList = document.getElementsByClassName('book');
  const oldBooks = document.getElementById('wardrobe');
  for (let index = 0; index < bookList.length; index++) {
    books.push(bookList[index]);
  }
  for (let j = 0; j < books.length; j++) {
    oldBooks.removeChild(books[j]);
  }
};
