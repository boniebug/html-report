const toggleModal = () => {
  const modal = document.querySelector('.addBookModal'); 
  modal.classList.toggle('hide');
}

const toggleAvailable = (button, availableButton, book) => {
  availableButton.classList.toggle('green');
  availableButton.classList.toggle('red');
  if (book.classList.contains('available')) {
    button.innerText = 'Return Book';
    availableButton.innerText = 'Unavailable';
  } else {
    button.innerText = 'Lend Book';
    availableButton.innerText = 'Available';
  }
  book.classList.toggle('available');
};

const addModalToggle = () => {
  const addBookButton = document.querySelector('.addBook');
  const removeModal = document.querySelector('#closeModal');
  addBookButton.addEventListener('click', toggleModal);
  removeModal.addEventListener('click', toggleModal);
};
