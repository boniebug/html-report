'use strict';

const createNewGroup = (propertyValue, groupedBooks) => {
  const groupedSection = document.querySelector('.grouped-section');
  const newGroup = createElementAssignClass('div', 'new-group-section');
  const subGroup = createElementAssignClass('div', 'grouped-books-section');
  const allBooksHeading = createElementAssignClass('h1', 'group-heading books-heading');
  allBooksHeading.innerText = propertyValue;
  newGroup.appendChild(allBooksHeading);
  newGroup.appendChild(subGroup);
  groupedBooks[propertyValue] = subGroup;
  groupedSection.appendChild(newGroup);
};

const deletePreviousGroups = () => {
  const previousGroups = document.querySelectorAll('.new-group-section');
  if (previousGroups.length !== 0) {
    previousGroups.forEach((eachGroup, index) => {
      eachGroup.remove();
    });
  }
};

const groupAndShowBooks = (allBooksData, filter) => {
  const groupedBooks = {};
  deletePreviousGroups();
  allBooksData['currentFilter'] = filter;
  for (const index in allBooksData['allBooks']) {
    let isGroupExist = false;
    const eachBook = allBooksData['allBooks'][index];
    const filterValue = eachBook[filter].toLowerCase();
    for (const key in groupedBooks) {
      isGroupExist = (filterValue === key) ? true : isGroupExist;
    }
    if (!isGroupExist) {
      createNewGroup(filterValue, groupedBooks);
    }
    groupedBooks[filterValue].appendChild(eachBook['bookElement']);
  }
};

const togglegroupDropDown = (groupDropDown) => {
  if (getComputedStyle(groupDropDown)['visibility'] === 'visible') {
    groupDropDown.style.cssText = 'visibility: hidden;';
  } else {
    groupDropDown.style.cssText = 'visibility: visible;';
  }
};

const dropDownEvents = (allBooksData, groupDropDown) => {
  const allBooksDataSection = document.querySelector('.all-books-data-section');
  const groupedSection = document.querySelector('.grouped-section');
  const allBooksBtn = document.querySelector('.all-books-btn');
  const allFilterBtns = document.querySelectorAll('.filter-btn');
  const bookProperties = getBookProperties();
  allFilterBtns.forEach((filterBtn, index) => {
    filterBtn.addEventListener('click', () => {
      allBooksDataSection.style.cssText = 'display: none';
      groupedSection.style.cssText = 'display: block';
      togglegroupDropDown(groupDropDown);
      groupAndShowBooks(allBooksData, bookProperties[index]);
    });
  });
  allBooksBtn.addEventListener('click', () => {
    allBooksDataSection.style.cssText = 'display: flex';
    groupedSection.style.cssText = 'display: none';
    togglegroupDropDown(groupDropDown);
    showAllBooks(allBooksData);
  });
};

const createNewBook = () => {
  const inputBookFields = document.querySelectorAll('.form-input');
  const formSection = document.querySelector('#form-box');
  formSection.style.cssText = 'visibility: hidden';
  let inputBookDetails = [];
  for (const eachFormInput of inputBookFields) {
    inputBookDetails.push(eachFormInput.value);
  }
  inputBookDetails = changeDataToObj(inputBookDetails);
  inputBookDetails['bookElement'] = createBookStructure(inputBookDetails);
  return inputBookDetails;
};
