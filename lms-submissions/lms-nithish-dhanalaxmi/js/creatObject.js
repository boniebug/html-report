'use strict';
const allBooksData = {};

// this functions deals with the commas which is inside the name of the book
const createObject = (bookDetails) => {
  const object = {};
  const splitedData = splitDetails(bookDetails);
  for (let index = 0; index < allBooksData['book0'].length - 1; index++) {
    object[allBooksData['book0'][index]] = splitedData[index];
  }
  object['availability'] = 'Available';
  return object;
};

// converting the data in to an array
const structuredData = () => {
  const allBooksDetails = allBooks.split('\n');
  const keys = allBooksDetails[0].split(',');
  keys.push('availability');
  allBooksData['book0'] = keys;
  for (let index = 1; index < allBooksDetails.length; index++) {
    allBooksData[`book${index}`] = createObject(allBooksDetails[index]);
  }
  return allBooksData;
};