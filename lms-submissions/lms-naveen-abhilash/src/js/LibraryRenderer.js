class CommonHtmlGenerator {
  static #genreToColor = {};

  static #getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    const colors = Object.values(this.#genreToColor);
    const finalColor = colors.includes(color) ? this.#getDarkColor() : color;
    return finalColor + '80';
  }

  static #genreColor(genre) {
    const genreLowerCase = genre.toLowerCase();
    const color = this.#genreToColor[genreLowerCase] || this.#getDarkColor();
    this.#genreToColor[genreLowerCase] = color;
    return color;
  }

  static createGenre(genre) {
    const tag = this.createPTag(genre, 'genre');
    tag.style.backgroundColor = this.#genreColor(genre);
    return tag;
  }

  static createButton(text, className, callback) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.innerText = text;
    callback && button.addEventListener('click', callback);
    return button;
  }

  static createDot(isAvailable) {
    const dot = document.createElement('div');
    dot.classList.add((isAvailable ? 'available' : 'unavailable') + '-bar');
    return dot;
  }

  static createPTag(text, className) {
    const pTag = document.createElement('p');
    className && pTag.classList.add(className);
    pTag.innerText = text;
    return pTag;
  }

  static createImageTag(imageUrl, className) {
    const bookImage = document.createElement('img');
    bookImage.src = imageUrl;
    bookImage.classList.add(className);
    return bookImage;
  }

  static createDetailsElement(key, value) {
    const container = document.createElement('p');

    const keyContainer = document.createElement('span');
    keyContainer.innerText = key;
    container.appendChild(keyContainer);

    const valueContainer = document.createElement('span');
    valueContainer.classList.add('info');
    valueContainer.innerText = value;
    container.appendChild(valueContainer);

    return container;
  }

  static createInputWithLabel({ id, text, type }) {
    const container = document.createElement('div');
    container.classList.add('form-field');

    const nameLabel = document.createElement('label');
    nameLabel.classList.add('form-label');
    nameLabel.for = id;
    nameLabel.innerText = text;

    const nameInput = document.createElement('input');
    nameInput.type = type;
    nameInput.id = id;
    nameInput.name = id;
    nameInput.placeholder = `Enter ${text}`;
    nameInput.classList.add('form-input');

    container.appendChild(nameLabel);
    container.appendChild(nameInput);
    return container;
  }

  static closePopup(popup) {
    const header = document.getElementById('header');
    const main = document.getElementById('main');

    header.classList.remove('disabled');
    main.classList.remove('disabled');
    popup.remove();
  }

  static showPopup(popup) {
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(popup);

    const header = document.getElementById('header');
    header.classList.add('disabled');
    const main = document.getElementById('main');
    main.classList.add('disabled');
  }

  static attachPopupActions(popup, primaryActionText, primaryActionCallback) {
    const popupActions = document.createElement('div');
    popupActions.classList.add('popup-actions');

    const submitButton = document.createElement('button');
    submitButton.classList.add('action-button');
    submitButton.innerText = primaryActionText.toUpperCase();
    popupActions.appendChild(submitButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'CLOSE';

    popupActions.appendChild(closeButton);
    popup.appendChild(popupActions);

    closeButton.addEventListener('click', () => this.closePopup(popup));

    submitButton.addEventListener('click', () => {
      primaryActionCallback();
      this.closePopup(popup);
    });
  }

  static createPopup(
    title,
    children,
    primaryActionText,
    primaryActionCallback
  ) {
    const popup = document.createElement('div');
    popup.classList.add('popup-container');

    const popupTitle = this.createPTag(title, 'popup-header');
    popup.appendChild(popupTitle);

    children.forEach(child => popup.appendChild(child));

    this.attachPopupActions(popup, primaryActionText, primaryActionCallback);
    return popup;
  }
}

class LibraryRenderer {
  #dropDownOptions = [
    {
      value: 'none',
      text: 'Select',
    },
    {
      value: 'name',
      text: 'Name',
    },
    {
      value: 'genre',
      text: 'Genre',
    },
    {
      value: 'author',
      text: 'Author',
    },
    {
      value: 'publishedYear',
      text: 'Published Year',
    },
    {
      value: 'isAvailable',
      text: 'Availability',
    },
  ];

  constructor(library) {
    this.library = library;
  }

  #handleLendOrReturnBook(bookId) {
    this.library.lendOrReturnBook(bookId);
    this.groupAndRenderBooks();
  }

  #handleAddBookSubmission() {
    const nameInputElement = document.getElementById('new-book-name');
    const publishedYearInputElement = document.getElementById(
      'new-book-published-year'
    );
    const genreInputElement = document.getElementById('new-book-genre');
    const authorInputElement = document.getElementById('new-book-author');
    const name = nameInputElement.value;
    const publishedYear = publishedYearInputElement.value;
    const genre = genreInputElement.value;
    const author = authorInputElement.value;

    if (
      name == '' ||
      publishedYear == '' ||
      genre == '' ||
      author == '' ||
      name == null ||
      publishedYear == null ||
      genre == null ||
      author == null ||
      name == undefined ||
      publishedYear == undefined ||
      genre == undefined ||
      author == undefined
    ) {
      alert(`Invalid Data !!!
        name: ${name}
        published year: ${publishedYear}
        genre: ${genre}
        author: ${author}
      `);
      return;
    }

    this.library.addBook(name, publishedYear, genre, author, null, true);
    alert(`Book "${name}" added successfully`);
    this.groupAndRenderBooks(true);
  }

  #createDropdown(text, scrollToTop, parent) {
    const id = text.toLowerCase() + '-by';
    const container = document.createElement('div');
    container.classList.add(id + '-container');

    const label = document.createElement('label');
    label.for = id;
    label.innerText = text + ' by:';
    container.appendChild(label);

    const select = document.createElement('select');
    select.id = id;
    select.name = id;
    select.addEventListener('change', () =>
      this.groupAndRenderBooks(scrollToTop)
    );
    container.appendChild(select);

    this.#dropDownOptions.forEach(({ value, text }) => {
      const option = document.createElement('option');
      option.value = value;
      option.innerText = text;
      select.appendChild(option);
    });

    parent.appendChild(container);
  }

  #createAndAppendAddBookButton(parent) {
    const text = 'Add new book';
    const className = 'add-book-button';
    const addBookButton = CommonHtmlGenerator.createButton(
      text,
      className,
      () => this.#showAddBookPopup()
    );
    parent.appendChild(addBookButton);
  }

  #addHomePageActions() {
    const container = document.getElementsByClassName('home-actions')[0];
    this.#createDropdown('Sort', false, container);
    this.#createDropdown('Group', true, container);
    this.#createAndAppendAddBookButton(container);
  }

  #showAddBookPopup() {
    const children = [
      CommonHtmlGenerator.createInputWithLabel({
        text: 'Name',
        id: 'new-book-name',
        type: 'text',
      }),
      CommonHtmlGenerator.createInputWithLabel({
        text: 'Published Year',
        id: 'new-book-published-year',
        type: 'number',
      }),
      CommonHtmlGenerator.createInputWithLabel({
        text: 'Genre',
        id: 'new-book-genre',
        type: 'text',
      }),
      CommonHtmlGenerator.createInputWithLabel({
        text: 'Author',
        id: 'new-book-author',
        type: 'text',
      }),
    ];

    const popup = CommonHtmlGenerator.createPopup(
      'Add new book',
      children,
      'submit',
      () => this.#handleAddBookSubmission()
    );
    CommonHtmlGenerator.showPopup(popup);
  }

  #renderBookActionsPopup(bookId) {
    const book = this.library.getBook(bookId);
    if (book == null) return;

    const children = [
      CommonHtmlGenerator.createImageTag(book.imageUrl, 'book-image'),
      CommonHtmlGenerator.createDetailsElement('By', book.author),
      CommonHtmlGenerator.createDetailsElement('In', book.publishedYear),
      CommonHtmlGenerator.createGenre(book.genre),
      CommonHtmlGenerator.createPTag(
        book.isAvailable ? 'Available' : 'Unavailable',
        book.isAvailable ? 'available-message' : 'unavailable-message'
      ),
    ];

    const popup = CommonHtmlGenerator.createPopup(
      book.name,
      children,
      book.isAvailable ? 'lend' : 'take back',
      () => this.#handleLendOrReturnBook(book.id)
    );
    CommonHtmlGenerator.showPopup(popup);
  }

  #renderBook(book, parent) {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    bookContainer.id = book.id;
    bookContainer.addEventListener('click', () =>
      this.#renderBookActionsPopup(book.id)
    );

    const statusDot = CommonHtmlGenerator.createDot(book.isAvailable);
    bookContainer.appendChild(statusDot);

    const bookName = CommonHtmlGenerator.createPTag(book.name, 'book-name');
    bookContainer.appendChild(bookName);

    const bookAuthor = CommonHtmlGenerator.createDetailsElement(
      'By',
      book.author
    );
    bookContainer.appendChild(bookAuthor);

    const bookPublishedYear = CommonHtmlGenerator.createDetailsElement(
      'In',
      book.publishedYear
    );
    bookContainer.appendChild(bookPublishedYear);

    const bookGenre = CommonHtmlGenerator.createGenre(book.genre);
    bookContainer.appendChild(bookGenre);

    parent.appendChild(bookContainer);
  }

  #renderGroupedBooks = (groupSelection, sortSelection) => {
    const groupedBooks = this.library.groupBooks(groupSelection, sortSelection);
    const grouped = Object.entries(groupedBooks);
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    for (const [groupedOption, books] of grouped) {
      const fieldSet = document.createElement('fieldset');
      fieldSet.classList.add('books-group');

      const legend = document.createElement('legend');
      legend.innerText = groupedOption;
      fieldSet.appendChild(legend);

      books.forEach(book => this.#renderBook(book, fieldSet));
      booksContainer.appendChild(fieldSet);
    }
  };

  #renderLegends() {
    const container = document.getElementById('legends');
    container.innerHTML = '';

    let legendContainer = document.createElement('div');
    legendContainer.classList.add('legend-container');

    let legend = document.createElement('div');
    legend.classList.add('available-bar');

    let message = document.createElement('span');
    message.innerText = 'Available';

    legendContainer.appendChild(legend);
    legendContainer.appendChild(message);
    container.appendChild(legendContainer);

    legendContainer = document.createElement('div');
    legendContainer.classList.add('legend-container');

    legend = document.createElement('div');
    legend.classList.add('unavailable-bar');

    message = document.createElement('span');
    message.innerText = 'Unavailable';

    legendContainer.appendChild(legend);
    legendContainer.appendChild(message);
    container.appendChild(legendContainer);
  }

  groupAndRenderBooks(scrollToTop = false) {
    const groupDropdown = document.getElementById('group-by');
    const groupSelection = groupDropdown.value;

    const sortDropdown = document.getElementById('sort-by');
    const sortSelection = sortDropdown.value;

    this.#renderGroupedBooks(groupSelection, sortSelection);
    this.#renderLegends();
    scrollToTop && window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    this.#addHomePageActions();
    this.groupAndRenderBooks();
  }
}
