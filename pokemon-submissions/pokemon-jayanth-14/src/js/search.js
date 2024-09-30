'use strict';

const closeResults = () => {
  const resultsContainer = document.getElementById('searchResults');
  const cardContainer = document.getElementById('cardContainer');
  const searchBox = document.getElementById('searchBox');
  cardContainer.classList.remove('hide');
  resultsContainer.classList.add('hide');
  searchBox.value = '';
};

const appendToResults = (results) => {
  if(results.length === 0) {
    toggleSearchPopUp();
    return;
  }
  const resultsContainer = document.getElementById('searchResults');
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.classList.add('hide');
  resultsContainer.classList.remove('hide');
  resultsContainer.innerText = '';
  results.forEach((card) => {
    resultsContainer.appendChild(card);
  });
};

const changeSearchIcon = (bool) => {
  const img = document.querySelector('.searchIcon');
  if (bool) {
    img.src = './src/images/x-regular-24.png';
    img.onclick = () => {changeSearchIcon(false)};
    return;
  }
  img.src = './src/images/search-regular-24.png';
  closeResults();
}

const isSearchEmpty = (query) => {
  if(query === '') {
    return true;
  }
  return false;
};

const toggleSearchPopUp = () => {
  document.querySelector('.searchPopUp').classList.toggle('hide');
  document.querySelector('.searchPopUpButton').onclick = toggleSearchPopUp;
}

const getResults = (query) =>{
  const data = document.querySelectorAll('#cardContainer .card');
  if ( isSearchEmpty(query)) {
    changeSearchIcon(false)
    closeResults();
    return;
  }
  const results = [];
  data.forEach((orgCard) => {
    const card = orgCard.cloneNode(true); 
    const name = card.querySelector('.cardTitle').innerText.toLowerCase();
    const id = card.querySelector('.cardId').innerText.toLowerCase();
    const types = card.querySelectorAll('.cardTypes .type');
    if (name.includes(query) || id.includes(query)) {
      results.push(card);
    }
    types.forEach((type) => {
      if (type.innerText.includes(query)) {
        results.push(card);
      }
    });
  });
  appendToResults(results);  
  changeSearchIcon(true);
};

const addSearchFunctionality = () => {
  const search = document.getElementById('searchBox');
  search.oninput = () => {
    getResults(search.value);
  };
};