const setEventListeners = (action) => {
  const searchElement = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');

  if (action === 'addLoading') {
    searchElement.removeEventListener('keydown', handleKeydown);
    searchButton.removeEventListener('click', handleSearch);

    searchElement.addEventListener('keydown', showLoadingPopup);
    searchButton.addEventListener('click', showLoadingPopup);
  } else if (action === 'removeLoading') {
    searchElement.removeEventListener('keydown', showLoadingPopup);
    searchButton.removeEventListener('click', showLoadingPopup);

    searchElement.addEventListener('keydown', handleKeydown);
    searchButton.addEventListener('click', handleSearch);
  }
};

const removeEventListeners = () => {
  const searchElement = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');

  searchElement.removeEventListener('keydown', handleKeydown);
  searchButton.removeEventListener('click', handleSearch);

  searchElement.removeEventListener('keydown', showLoadingPopup);
  searchButton.removeEventListener('click', showLoadingPopup);
};

const handleKeydown = (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};

const addSearchButtonEventListener = () => {
  const searchElement = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');

  searchButton.addEventListener('click', handleSearch);
  searchElement.addEventListener('keydown', handleKeydown);
};
