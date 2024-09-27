"use strict";

const getCategories = function (booksData) {
  const headers = booksData.headers;
  const allBooksData = booksData.data;
  displayAllBooksData();
  for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
    if (headers[headerIndex] !== "Name") {
      let oneNames = [];
      let dataOfCategory = removeDuplicateNames(
        headers[headerIndex],
        allBooksData,
        oneNames
      ); 
      createCategoryButton(headers[headerIndex], dataOfCategory, booksData);
    }
  }
};

const displayAllBooksData = function() {
  const displayAllBooks = document.createElement("div");
  displayAllBooks.classList.add("categorise-container");

  const categoryButton = createButton('All books');
  displayAllBooks.appendChild(categoryButton);
  document.getElementById('buttonContainer').appendChild(displayAllBooks);

  categoryButton.addEventListener('click', function() {
    document.getElementById('bookContainer').style.display = 'flex';
    document.getElementById('categoryContainer').style.display = 'none';

    document.querySelectorAll('.individualcategory').forEach(function(category) {
      category.style.display = 'none';
    });
  });
};



const removeDuplicateNames = function (category, data, oneNames) {
  for (let index = 0; index < data.length; index++) {
    let isDuplicate = false;
    for (let namesIndex = 0; namesIndex < oneNames.length; namesIndex++) {
      if (oneNames[namesIndex] === data[index][category]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      oneNames.push(data[index][category]);
    }
  }
  return oneNames;
};

const createCategoryButton = function (category, dataOfCategory, booksData) {
  const container = document.createElement("div");
  container.classList.add("catergorise-container");
  let categoryButton = createButton(category);
  categoryButton.addEventListener("click", function () {
    document.getElementById('categoryContainer').innerHTML = '';
    document.getElementById('bookContainer').style.display = 'none';
    document.getElementById('categoryContainer').style.display = 'block';
    for (let index = 0; index < dataOfCategory.length; index++) {
      displayBooksByCategory(dataOfCategory[index], booksData, category);
    }
  });
};

const createButton = function (category) {
  const categoryName = document.createElement("div");
  categoryName.classList.add("categoriseBtnStyle");
  categoryName.innerText = category;
  document.getElementById("buttonContainer").appendChild(categoryName);
  return categoryName;
};

const createCatagoryDiv = function (category, categoryValue) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("categoryName");
  categoryDiv.textContent = category +' : '+ categoryValue;
  document.getElementById("categoryContainer").append(categoryDiv);
  const styleClassesNames = {
    Name: "bookName",
    "Published Year": "publishedYear",
    Genre: "Genre",
    Author: "authorName",
  };
  return styleClassesNames;
};

const displayBooksByCategory = function (categoryValue, booksData, category) {
  const styleNames = createCatagoryDiv(category, categoryValue);
  let  individualcategory = createContainer();
  let book = document.getElementsByClassName("book");
  for (let index = 0; index < booksData.data.length; index++) {
    let availabilityText = document.getElementsByClassName("availability");
    const avail = availabilityText[index].innerText;
    if (booksData.data[index][category].toUpperCase() === categoryValue.toUpperCase()) {
      displayCategoriesBooks(booksData.data[index], styleNames, booksData.headers, avail ,individualcategory );
    }
  }
};

const displayCategoriesBooks = function (book, ClassesNames, headers, avail ,individualcategory) {
  let bookContents = document.createElement("div");
  bookContents.classList.add("book");
  for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
    let headerName = headers[headerIndex];
    let bookDetails = document.createElement("div");
    bookDetails.classList.add(ClassesNames[headerName]);
    bookDetails.innerText =
      headerName === "Name" ? book[headerName] : headerName + " : " + book[headerName];
    bookContents.appendChild(bookDetails);
  }
  availability(bookContents, avail);
  individualcategory.append(bookContents);
};

const createContainer = function (bookContents) {
  const bookscontainer = document.createElement("div");
  bookscontainer.classList.add('individualcategory');
  document.getElementById("categoryContainer").appendChild(bookscontainer);
  return bookscontainer;
};
