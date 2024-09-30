const showLoadingIndicator = () => {
  removeEventListeners();
  setEventListeners('addLoading');

  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'block';
};

const hideLoadingIndicator = () => {
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'none';

  hidePopup();
  removeEventListeners();
  setEventListeners('removeLoading');
};
