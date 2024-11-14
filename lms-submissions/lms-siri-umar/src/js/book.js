class Book {
  constructor({ title, publishYear, genre, author, isAvailable = true }) {
    this.title = title;
    this.publishYear = publishYear;
    this.genre = genre;
    this.author = author;
    this.isAvailable = isAvailable;
    this.lendCount = 0;
  }

  toggleAvailbility() {
    this.isAvailable = !this.isAvailable;
    return this.isAvailable;
  }

  getTitle() {
    return this.title;
  }
  getPublishedYear() {
    return this.publishYear;
  }
  getGenre() {
    return this.genre;
  }
  getAuthor() {
    return this.author;
  }
  getAvailability() {
    return this.isAvailable;
  }
  lendStatus() {
    return this.isAvailable ? 'Lend Book' : 'Return';
  }
  availabilityStatus() {
    return this.isAvailable ? 'Available' : 'Unavailable';
  }
  getLendCount() {
    if (!this.lendCount) {
      return '0'
    }
    return this.lendCount;
  }
  increaseLendCount() {
    if (this.isAvailable) {
      this.lendCount += 1;
    }
  }
}
