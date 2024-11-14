'use strict';

const destructureCsv = () => {
  const allBooks = booksData.split('\n');
  const headers = allBooks[0].split(',');
  headers.forEach(((value, i)=> headers[i] = headers[i].replace(/ /gi,'-')));
  headers.push('Availability');
  const books =[headers];
  for (let indexOfBooks = 1; indexOfBooks < allBooks.length; indexOfBooks++) {
    const details = allBooks[indexOfBooks].split(',') , book = {};
    for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
      book[headers[headerIndex]] = details[headerIndex];
    }
    books.push(book);
  }
  return books;
};
