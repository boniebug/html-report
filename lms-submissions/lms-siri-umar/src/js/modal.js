const appearModal = () => {
  const modalBox = document.getElementById('add-book-modal');
  const modalBackground = document.getElementById('modal-background');
  modalBackground.style.display = 'block';
  modalBox.style.display = 'block';
};
  
const closeModal = () => { 
  const modalBox = document.getElementById('add-book-modal');
  const modalBackground = document.getElementById('modal-background');
  modalBackground.style.display = 'none';
  modalBox.style.display = 'none';
};
