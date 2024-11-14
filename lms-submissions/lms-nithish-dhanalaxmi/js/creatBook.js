'use strict';

const creatDetailsTag = (div) => {
  for (let index = 0; index < allBooksData['book0'].length - 1; index++) {
    const element = document.createElement('p');
    element.className = toCamelCase(allBooksData['book0'][index]);
    div.appendChild(element);
  }
  const availability = document.createElement('p');
  availability.className = 'available';
  div.appendChild(availability);
};

const createDiv = () => {
  const div = document.createElement('div');
  creatDetailsTag(div);
  return div;
};

const appendBookToSection = (book) => {
  console.log(book);
  getElement(book.classList[0]).appendChild(book);
};

const displayDive = (div) => {
  const container = document.getElementById('libraryContainer');
  const value = getElement('filterButton').value;
  if (value === 'All') {
    container.style.display = 'grid';
    container.appendChild(div);
  } else {
    container.style.display = 'block';
    appendBookToSection(div);
  }
};

const displayAvaiablity = (available, toggleButton, bookKey) => {
  const islend = allBooksData[bookKey]['availability'] === 'Available';
  available.innerText = allBooksData[bookKey]['availability'];
  toggleButton.textContent = islend ? 'Lend' : 'Receive';
  available.className = islend ? 'available' : 'unAvailable';
};

// display's availability of book
const isAvailable = function (div, available, bookKey) {
  const toggleButton = document.createElement('button');
  displayAvaiablity(available, toggleButton, bookKey);
  div.appendChild(toggleButton);
  toggleButton.addEventListener('click', () => {
    const islend = allBooksData[bookKey]['availability'] === 'Available';
    allBooksData[bookKey]['availability'] = islend ? 'Not Available' : 'Available';
    displayAvaiablity(available, toggleButton, bookKey);
  });
};

const setClassName = (div, bookKey) => {
  const value = getElement('filterButton').value;
  if (value !== 'All') {
    const category = toCamelCase(allBooksData[bookKey][value]).replace(/[.]/g, '');
    div.classList.add(category, "book");
  } else {
    div.classList.add("book");
  }
  return div;
};

const appendData = (bookDetails, bookKey) => {
  const div = createDiv();
  const childrens = div.children;
  const length = allBooksData['book0'].length;
  for (let index = 0; index < length - 1; index++) {
    const key = allBooksData['book0'][index];
    childrens[index].innerText = index === 0 ?
      bookDetails[key] : `${key} : ${bookDetails[key]}`;
  }
  isAvailable(div, childrens[length - 1], bookKey);
  displayDive(setClassName(div, bookKey));
};
