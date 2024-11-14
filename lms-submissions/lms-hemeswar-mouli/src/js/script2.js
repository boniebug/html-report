'use strict';

const getAllDetails = (details) => {
  const allDetailsElement = document.querySelectorAll(`.${details}`);
  const allDetails = [];
  allDetailsElement.forEach(element => {
    allDetails.push(element.innerText);
  });
  allDetails.sort();
  return allDetails;
}

const getAllPossibleDetails = (details) => {
  const allDetails = getAllDetails(details);
  const allPossibleDetails = [];
  allPossibleDetails.push(allDetails[0]);
  for (let index = 1; index < allDetails.length; index++) {
    if (allDetails[index - 1] !== allDetails[index]) {
      allPossibleDetails.push(allDetails[index]);
    }
  }
  return allPossibleDetails;
};

const appendCategoryHeading = (aCategory) => {
  const booksContainer = document.querySelector('#books-container');
  const h2CategoryHeading = document.createElement('h2');
  h2CategoryHeading.innerText = aCategory;
  h2CategoryHeading.classList.add('category-heading');
  booksContainer.appendChild(h2CategoryHeading);
};

const appendCategory = (getAllPossibleDetail) => {
  getAllPossibleDetail.forEach(element => {
    appendCategoryHeading(element);
  });
};

const removeCategoriseHeadings = () => {
  const categoryHeadings = document.querySelectorAll('h2');
  categoryHeadings.forEach(categoryHeading => {
    categoryHeading.remove();
  });
};

const appendHeading = (categoriseByWhat) => {
  const booksContainer = document.querySelector('#books-container');
  const h2CategorisedByHeading = document.createElement('h2');
  h2CategorisedByHeading.setAttribute('id', categoriseByWhat);
  h2CategorisedByHeading.setAttribute('class', 'categorised-by-heading')
  h2CategorisedByHeading.innerText = `Categorised by ${categoriseByWhat}`;
  booksContainer.insertAdjacentElement('afterbegin', h2CategorisedByHeading);
};

const appendBooks = (aDetailElement) => {
  const bookSection = document.querySelectorAll('.book-section');
  const categoryHeading = document.querySelectorAll('.category-heading');
  categoryHeading.forEach(element => {
    bookSection.forEach(element2 => {
      const aDetail = element2.querySelector(`.${aDetailElement}`).innerText;
      if (element.innerText === aDetail) {
        element.after(element2);
      }
    });
  });
};

const noCategoriseFunction = () => {
  const bookSections = document.querySelectorAll('.book-section');
  const categoryHeadings = document.querySelectorAll('.category-heading');
  bookSections.forEach(bookSection => {
    const aRandomNumber = parseInt(Math.random()*(categoryHeadings.length));
    categoryHeadings[aRandomNumber].after(bookSection);
  });
};

const categoriseByADetails = (event) => {
  const allPossibleDetails = getAllPossibleDetails(event.target.value);
  if(event.target.value !== 'no-categorise'){
    removeCategoriseHeadings();
    appendHeading(event.target.value);
    appendCategory(allPossibleDetails);
    appendBooks(event.target.value);
  } else {
    noCategoriseFunction();
    removeCategoriseHeadings();
  }
};

window.onload = () => {
  addBooksDetailsToDocument();
  const addBookForm = document.querySelector('.add-book-form');
  const closeButton = document.querySelector('#close-button');
  const addBook = document.querySelector('#add-book');
  const formBackground = document.querySelector('.form-background');
  const selectList = document.querySelector('#categorise-list');
  const body = document.querySelector('body');
  addBook.addEventListener('click', () => openForm(addBookForm, formBackground, body));
  closeButton.addEventListener('click', () => closeForm(addBookForm, formBackground, body));
  addBookForm.addEventListener('submit', formOnSubmit);
  formBackground.addEventListener('click', () => closeForm(addBookForm, formBackground, body));
  selectList.addEventListener('change', categoriseByADetails);
};