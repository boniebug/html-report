const defineGroupObject = () => {
  const headings = getHeadings();
  for (const index of headings) {
    groupObject[index] = [];
  }
};

const makeGroups = (array) => {
  const keys = Object.keys(groupObject);
  let exists = true;
  for (const index in array) {
    exists = group(keys[index], array[index]);
  }
  return exists;
};

const group = (key, data) => {
  if (!groupObject[key].includes(data) && data !== '') {
    groupObject[key].push(data);
    return false;
  }
  return true;
};

const createDropDown = () => {
  const header = document.getElementById('headerButtons');
  const dropDownBox = document.createElement('select');
  const allBooks = document.createElement('option');
  dropDownBox.id = 'category';
  allBooks.innerText = 'All Books';
  dropDownBox.append(allBooks);
  addAnotherOptions(dropDownBox);
  header.append(dropDownBox);
  addEventSelect();
};

const addAnotherOptions = (dropDownBox) => {
  for (const key of getHeadings()) {
    const option = document.createElement('option');
    dropDownBox.append(option);
    option.innerText = key;
  }
};

const addEventSelect = () => {
  const Select = document.getElementById('category');
  Select.addEventListener('change', () => {
    categorize(Select.value);
  });
};

const categorize = (categorySelected) => {
  const mainSection = document.getElementById('mainSection');
  if (!isCategoryBoxesCreated()) {
    for (const value of groupObject[categorySelected]) {
      if (value !== '') {
        createCategoryDiv(mainSection, value);
        appendBooks(categorySelected, value);
      }
    }
  }
};

const createCategoryDiv = (mainSection, categoryValue) => {
  mainSection.style.gridTemplateColumns = 'auto';
  const DIV = document.createElement('div');
  const Heading = document.createElement('h2');
  DIV.append(Heading);
  DIV.id = categoryValue;
  DIV.classList.add('category');
  Heading.innerText = categoryValue;
  mainSection.append(DIV);
  return DIV;
};

const appendBooks = (category, categoryValue) => {
  const categoryDiv = document.getElementById(categoryValue);
  const bookDivs = document.querySelectorAll('.book');
  for (const book of bookDivs) {
    appendBookToCategoryBox(book, categoryDiv, category)
  }
};

const appendBookToCategoryBox = (bookDiv, categoryBox, category) => {
  const mainSection = document.getElementById('mainSection');
  const heading = categoryBox.querySelector('h2');
  const id = `#${category}`;
  const element = bookDiv.querySelector(id);
  if (heading.innerText.toLowerCase() === element.innerText.toLowerCase()) {
    const appendingElement = mainSection.removeChild(bookDiv);
    categoryBox.append(appendingElement);
  }
};

const isCategoryBoxesCreated = () => {
  const mainSection = document.getElementById('mainSection');
  const categoryBoxes = document.querySelectorAll('.category');
  if (categoryBoxes.length !== 0) {
    for (const box of categoryBoxes) {
      const books = box.querySelectorAll('.book');
      for (const eachbook of books) {
        mainSection.append(box.removeChild(eachbook));
      }
      mainSection.removeChild(box);
    }
    mainSection.style.gridTemplateColumns = 'auto auto auto auto auto'
  }
  return false;
};
