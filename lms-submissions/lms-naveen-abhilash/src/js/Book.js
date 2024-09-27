class Book {
  #id;
  #name;
  #genre;
  #author;
  #publishedYear;
  #imageUrl;
  #isAvailable;

  constructor(id, name, publishedYear, genre, author, imageUrl, isAvailable) {
    this.#id = id;
    this.#name = name;
    this.#publishedYear = publishedYear;
    this.#genre = genre;
    this.#author = author;
    this.#imageUrl = imageUrl || './src/assets/images/no-image.png';
    this.#isAvailable = isAvailable;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get author() {
    return this.#author;
  }

  get genre() {
    return this.#genre;
  }

  get publishedYear() {
    return this.#publishedYear;
  }

  get imageUrl() {
    return this.#imageUrl;
  }

  get isAvailable() {
    return this.#isAvailable;
  }

  set isAvailable(isAvailable) {
    this.#isAvailable = isAvailable;
  }
}
