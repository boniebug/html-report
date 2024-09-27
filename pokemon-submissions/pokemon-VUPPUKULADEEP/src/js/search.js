const originalData = async () => {
  const data = document.querySelectorAll('.content');
  return data;
}

const searchaddevent = async function () {
  const searchBar = document.getElementById('search-box');
  const data = await originalData();
  searchBar.addEventListener('input', () => {
    search(searchBar.value, data);
  })
};

const search = function (searchvalue, data) {
  const value = getValue(searchvalue);
  if(value === '') {
    printOrgData(data)
  }
  else{
    searchValue(value, data);
  }
};

const getValue = function(value) {
  return value;
}

const searchValue = function (value, contents) {
  const array = [];
  for (let index = 0; index < contents.length; index++) {
    const contentArray = contents[index];
    for (let index = 1; index < contentArray.children.length; index++) {
      if (contentArray.children[index].innerText.includes(value)) {
        array.push(contentArray)
      }
    }
  }
  print(array);
}

const printOrgData = function(data) {
  let container = document.querySelector('.container');
  for(let index = 0; index < data.length; index++) {
    container.appendChild(data[index]);
  }
}

const print = function (array) {
  const container = document.querySelector('.container');
  if(array.length === 0) {
    container.innerText = 'NO RESULTS FOUND';
    return;
  }
  container.innerText = null;
  for (let index = 0; index < array.length; index++) {
    container.appendChild(array[index]);
  }
}