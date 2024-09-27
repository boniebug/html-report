class Library {
  constructor() {
    this.books = [];
    this.currentView = { value: '' };
  }
  addBook(bookData) {
    const newBook = new Book(bookData);
    this.books.unshift(newBook);
  }
  
  sortBooks() {
    return this.books.sort((book1, book2) => {
      return book2.lendCount - book1.lendCount;
    });
  }

  categorizeBooks(key) {
    const keys = {};
    this.books.forEach((book) => {
      const categorizeKey = book[key];
      let keyValue =
        typeof categorizeKey === 'string'
          ? categorizeKey.toLowerCase()
          : categorizeKey;
      if (!keys[keyValue]) {
        keys[keyValue] = [];
      }
      keys[keyValue].push(book);
    });
    return keys;
  }
}
