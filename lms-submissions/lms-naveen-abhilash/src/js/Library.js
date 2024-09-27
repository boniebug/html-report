class Library {
  #books;

  constructor() {
    this.#books = [];
  }

  get books() {
    return this.#books;
  }

  getBook(id) {
    return this.#books.find(book => book.id == id);
  }

  addBook(name, publishedYear, genre, author, imageUrl, isAvailable) {
    const id = this.#books.length + 1;
    const book = new Book(
      id,
      name,
      publishedYear,
      genre,
      author,
      imageUrl,
      isAvailable
    );
    this.#books.unshift(book);
  }

  lendOrReturnBook(id) {
    const book = this.getBook(id);
    book.isAvailable ? this.#lendBook(book) : this.#takeBackBook(book);
  }

  #lendBook(book) {
    book.isAvailable = false;
  }

  #takeBackBook(book) {
    book.isAvailable = true;
  }

  #sortBooks(books, sortSelection) {
    if (sortSelection == 'publishedYear') {
      books.sort((book1, book2) => {
        return Number(book1.publishedYear) - Number(book2.publishedYear);
      });
    } else if (sortSelection == 'isAvailable') {
      books.sort((book1, book2) => {
        if (book1.isAvailable) return -1;
        if (book2.isAvailable) return 1;
        return 0;
      });
    } else if (sortSelection == 'none') {
      books.sort((book1, book2) => Number(book2.id) - Number(book1.id));
    } else {
      books.sort((book1, book2) => {
        if (book1[sortSelection] < book2[sortSelection]) return -1;
        if (book1[sortSelection] > book2[sortSelection]) return 1;
        return 0;
      });
    }
  }

  groupBooks(groupSelection, sortSelection) {
    const groupedBooks = this.#books.reduce((grouped, book) => {
      let key = book[groupSelection];
      if (groupSelection == 'none') key = 'All Books';
      if (groupSelection == 'isAvailable')
        key = key ? 'Available' : 'Unavailable';
      grouped[key] = grouped[key] || [];
      grouped[key].push(book);
      return grouped;
    }, {});

    for (const key in groupedBooks) {
      this.#sortBooks(groupedBooks[key], sortSelection);
    }

    return groupedBooks;
  }

  static load(booksCSVData) {
    const library = new Library();
    booksCSVData
      .split('\n')
      .slice(1)
      .filter(line => line)
      .forEach((line, index) => {
        const [name, publishedYear, genre, author, imageUrl] = line.split(',');
        library.addBook(
          name,
          publishedYear,
          genre,
          author,
          imageUrl,
          index % 2 == 0
        );
      });
    return library;
  }
}
