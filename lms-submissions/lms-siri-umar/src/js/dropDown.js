const createDropDown = (myLibrary) => {
  const outerWrapper = document.createElement('div');
  const options = [
    {name: 'All Books',
     value: ''
    },
    {
      name: 'Genre',
      value: 'genre'
    },
    {
      name: 'Author',
      value: 'author'
    }
  ];
  options.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option.name;
    button.addEventListener('click',() => {
      myLibrary.currentView.value = option.value;
      categorizeBooks(myLibrary, option.value);
    });
    button.className = 'option-btn';
    outerWrapper.appendChild(button);
  });
  outerWrapper.id = 'dropdown';
  return outerWrapper;
};

const hideDropDown = () => {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    const dropdownContainer = document.getElementById('dropdown-container');
    dropdownContainer.removeChild(dropdown);
  }
};

const showDropDown = (myLibrary) => {
  const dropdownContainer = document.getElementById('dropdown-container');
  const dropdown = createDropDown(myLibrary);
  dropdownContainer.appendChild(dropdown);
  document.querySelectorAll('.option-btn').forEach((button) => {
    button.addEventListener('click', hideDropDown);
  });
};

const toggleDropDown = (myLibrary) => {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    hideDropDown();
  } else {
    showDropDown(myLibrary);
  }
};
