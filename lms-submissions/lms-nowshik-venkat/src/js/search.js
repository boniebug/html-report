'use strict';

const searchBook = () => {
  const searchInput = document.getElementById('searchBookName');
  const booksData = document.querySelectorAll('.bookDetails section');
  const searchValue = searchInput.value.toLowerCase();
  booksData.forEach((book) => {
    const bookName = book.innerText.toLowerCase();
    if (bookName.includes(searchValue)) {
      book.style.display = 'flex';
    } else {
      book.style.display = 'none';
    }
  });
};