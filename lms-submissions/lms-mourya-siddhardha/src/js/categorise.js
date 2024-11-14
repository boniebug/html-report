'use strict';

const categoriseByFilter = (libraryBooks, criteria) => {
  console.log(criteria);
  if(criteria === 'all books') {
     clearMain();
    makeMainSection(bookDetails);
  }
  else{ 
  const criterionArray = [], categorisedBooks = [];
  for (const key in libraryBooks) {
    let criterianElement = libraryBooks[key][criteria].toString();
    criterianElement = criterianElement.toLowerCase();
    
    if (criterionArray.includes(criterianElement)) {
      const index = criterionArray.indexOf(criterianElement);
      categorisedBooks[index].push(libraryBooks[key]);
    } else {
      criterionArray.push(criterianElement);
      categorisedBooks.push([libraryBooks[key]]);
    }
  }
  clearMain();
  for (const element of categorisedBooks) {
    const criterianElement = element[0][criteria];
    makeMainSection(element, criterianElement);
  }
}
};
