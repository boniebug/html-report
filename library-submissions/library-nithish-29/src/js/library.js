const books = [];

const getBook = id => {
  return books.find(book => book.id == id);
};

const addBook = (name, publishedYear, genre, author, imageUrl, isAvailable) => {
  const id = books.length + 1;
  const book = {
    id,
    name,
    publishedYear,
    genre,
    author,
    imageUrl: imageUrl || './src/assets/images/no-image.png',
    isAvailable,
  };
  books.unshift(book);
};

const lendOrReturnBook = id => {
  const book = getBook(id);
  book.isAvailable = !book.isAvailable;
};

const groupBooks = (groupSelection) => {
  const groupedBooks = books.reduce((grouped, book) => {
    let key = book[groupSelection];
    if (groupSelection == 'none') key = 'All Books';
    if (groupSelection == 'isAvailable')
      key = key ? 'Available' : 'Unavailable';
    grouped[key] = grouped[key] || [];
    grouped[key].push(book);
    return grouped;
  }, {});

  return groupedBooks;
};
const disableButton = () => {
  const addBook = document.getElementsByClassName('add-book-button');
  for (let index = 0; index < addBook.length; index++) {
    addBook[index].addEventListener('click', displayPopup);
  }
};

const displayPopup = async () => {
  const popup = document.getElementById('popUp');
  const booksLoading = document.getElementById('booksLoading');
  const isBooksLoaded = booksLoading.style.display === 'flex';
  popup.style.display = isBooksLoaded ? 'flex' : 'none';
  await new Promise(resolve => {
    setTimeout(() => {
      popup.style.display = 'none';
      resolve();
    }, 2000);
  });
};

const delayFor5sec = async () => {
  const booksLoading = document.getElementById('booksLoading');
  const groupBy = document.getElementById('group-by');
  disableButton();
  booksLoading.style.display = 'flex';
  groupBy.addEventListener('click', displayPopup);
  await new Promise(resolve => {
    setInterval(() => {
      booksLoading.style.display = 'none';
      resolve();
    }, 5000);
  });
};

const load = async (booksCSVData) => {
  await delayFor5sec();
  const lines = booksCSVData.split('\n').slice(1).filter(line => line);
  return new Promise(async (resolve) => {
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      const [name, publishedYear, genre, author, imageUrl] = line.split(',');
      addBook(name, publishedYear, genre, author, imageUrl, index % 2 === 0);
    }
    resolve('resolved');
  });
};

