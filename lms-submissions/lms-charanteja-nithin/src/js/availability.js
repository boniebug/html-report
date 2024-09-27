"use strict";

const availFunctionality = function (bookContents, bookAvailability ,avail) {
  bookAvailability.style.color = (bookAvailability.innerText === "UN-AVAILABLE") ? "red" : "rgb(26, 241, 112)";
  bookContents.addEventListener("click", function () {
    if (bookAvailability.innerText === "AVAILABLE") {
      bookAvailability.innerText ="UN-AVAILABLE";
      avail = "UN-AVAILABLE";
      bookAvailability.style.color = "red";
      console.log(avail);
    } else {
      avail = "AVAILABLE";
      bookAvailability.innerText = "AVAILABLE";
      bookAvailability.style.color = "rgb(26, 241, 112)";
      console.log(avail);
    }
  });
};

const availability = function (bookContents , avail) {
  const bookAvailability = document.createElement("div");
  bookAvailability.classList.add("availability");
  bookContents.append(bookAvailability);
  bookAvailability.innerText = avail;
  availFunctionality(bookContents, bookAvailability);
  statusText(bookAvailability);
};
const statusText = function (bookAvailability ) {
  const statusText = document.createElement("div");
  statusText.classList.add("statusText");
  document.body.append(statusText);
  statusText.innerText = "Book is Available now, dbclick to lend";
  changeStatusText(bookAvailability, statusText);
};
const changeStatusText = function (bookAvailability, statusText) {
  bookAvailability.addEventListener("mouseover", function () {
    if (bookAvailability.innerText === "UN-AVAILABLE") {
      statusText.innerText =
        "Book is unavailable to lend, pls dbclick to udo the status";
    } else if (bookAvailability.innerText === "AVAILABLE") {
      statusText.innerText = "Book is Available now, dbclick to lend";
    }
    statusText.style.display = "block";
  });
  bookAvailability.addEventListener("mouseleave", function () {
    statusText.style.display = "none";
  });
};
