'use strict';

const checkAvailability = (event) => {
  const bookStatus = event.target.parentElement.querySelector('.Availability');
  const id = event.target.parentElement.parentElement.id;
  if (myLibrary[id].Availability === 'Available') {
    event.target.innerText = 'Receive';
    bookStatus.classList.add('not-available');
    bookStatus.innerText = 'Not Available';
    myLibrary[id].Availability = 'Not Available';
  } else {
    event.target.innerText = 'Lend';
    bookStatus.innerText = 'Available';
    bookStatus.classList.remove('not-available');
    myLibrary[id].Availability = 'Available';
  }
};

const createAvailabilityButton = (newDetails) => {
  const button = document.createElement('button');
  button.innerText = 'Lend';
  button.setAttribute('class', 'lend-receive');
  newDetails.append(button);
};

const createBookDetailsStructure = (detailsStructure) => { 
  const headerValues = myLibrary[0];
  for (let index = 0; index < headerValues.length; index++) {
    const newValue = headerValues[index];
    const newDetailContainer = document.createElement('p');
    newDetailContainer.classList.add(`book-${newValue}` , 'detail');
    const newDetailSpan = document.createElement('span');
    newDetailSpan.className = newValue;
    newDetailContainer.append(newValue + ' : ', newDetailSpan);
    detailsStructure.append(newDetailContainer);
  };
};

const createBookStructure = () => {
  const book = document.createElement('div');
  const details = document.createElement('div');
  book.setAttribute('class', 'book');
  book.setAttribute('id', newBookId++);
  details.setAttribute('class', 'details');
  createBookDetailsStructure(details);
  book.appendChild(details);
  createAvailabilityButton(details);
  return book;
};

const assignAvailability = (element, button) => {
  const id = element.id;
  if (myLibrary[id].Availability === 'Not Available') {
    button.innerText = 'Receive';
    const availability = element.querySelector('.Availability');
    availability.innerText = 'Not Available';
    availability.classList.add('not-available');
  }
};

const createNewBook = (newlyAddedbook) => {
  const newHtmlElement = createBookStructure();
  const headerValues = myLibrary[0];
  for (let index = 0; index < headerValues.length; index++) {
    const newValueKey = headerValues[index];
    const detailSpan = newHtmlElement.querySelector(`.${newValueKey}`);
    detailSpan.innerText = newlyAddedbook[newValueKey];
  }
  const button = newHtmlElement.querySelector('.lend-receive');
  assignAvailability(newHtmlElement, button);
  button.addEventListener('click', checkAvailability);
  return newHtmlElement;
}