'use strict';

const books = [];

const getBook = id => {
  return books.find(book => book.id == id);
};

const addBook = (book) => {
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

const load = async (booksCSVData) => {
  try {
    booksCSVData
      .split('\n')
      .slice(1)
      .filter(line => line)
      .forEach((line, index) => {
        const [name, publishedYear, genre, author] = line.split(',');
        const book = {
          id: index + 1,
          name: name.trim(),
          publishedYear: publishedYear.trim(),
          genre: genre.trim(),
          author: author.trim(),
          isAvailable: index % 2 === 0
        };
        addBook(book);
      });
  } catch (error) {
    console.error('Error loading data:', error);
  }
};
