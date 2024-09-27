"use strict";

const displayForm = function () {
    document.getElementById("addNewbook").style.display = "flex";
  };
  const closeForm = function () {
    document.getElementById("addNewbook").style.display = "none";
  };
  
  const newBookDetails = function () {
    let bookDetails = {
      Name: document.getElementById("name").value,
      Genre: document.getElementById("bookGerne").value,
      Author: document.getElementById("authorName").value,
      "Published Year": document.getElementById("year").value,
    };
    return bookDetails;
  };
  
const addBook = function(classList, booksData , avail) {
    document.getElementById("startAdding").addEventListener("click", function() {
      const form = document.getElementById("addNewbook");
      const bookDetails = newBookDetails();
      booksData.data . push(bookDetails);
      
      displayBook(bookDetails, classList , booksData.headers , avail);
      form.style.display = "none";
      form.reset();
      console.log(booksData.data);
    });
  }