const getContentElements = () => {
  const contentElements = document.querySelectorAll('.content');
  return contentElements;
}

const addSearchEvent = async function () {
  const searchInputField = document.getElementById('search-box');
  const contentElements = await getContentElements();
  searchInputField.addEventListener('input', () => {
    search(searchInputField.value, contentElements);
  })
};

const search = function (searchValue, contentElements) {
  const value = getLowerCaseValue(searchValue);
  if (value === null) {
    printOriginalData(contentElements)
  }
  else {
    filterContent(value, contentElements);
  }
};

const getLowerCaseValue = function (value) {
  return value.toLowerCase();
}

const filterContent = function (value, contents) {
  const filteredContent = [];
  for (let index = 0; index < contents.length; index++) {
    const contentElement = contents[index];
    for (let childIndex = 1; childIndex < contentElement.children.length; childIndex++) {
      if(contentElement.children[childIndex].className === 'hidden') {
        continue;
      }
      else if (contentElement.children[childIndex].innerText.includes(value)) {
        filteredContent.push(contentElement)
      }
    }
  }
  printResults(filteredContent);
}

const printOriginalData = function (contentElements) {
  let container = document.querySelector('.container');
  const noResults = document.querySelector('.no-results');
  if (noResults) {
    container.removeChild(noResults);
  }
  for (let index = 0; index < contentElements.length; index++) {
    container.appendChild(contentElements[index]);
  }
}

const printResults = function (filteredContent) {
  const container = document.querySelector('.container');
  const noResults = document.createElement('p');
  noResults.innerText = 'NO RESULTS FOUND';
  noResults.className = 'no-results';
  container.innerText = null;
  if (filteredContent.length === 0) {
    container.append(noResults)
    return;
  }
  for (let index = 0; index < filteredContent.length; index++) {
    container.appendChild(filteredContent[index]);
  }
}