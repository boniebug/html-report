let libraryRenderer;
const setLoader = async () => {
  const main = document.getElementById('main');
  const loaderBox = document.createElement('div');
  const loader = document.createElement('div');
  const text = document.createElement('h2');
  loaderBox.id = 'loader';
  text.innerText = 'Loading....';
  loaderBox.append(loader, text);
  main.append(loaderBox);
};
const showBox = async () => {
  const box = document.getElementById('showBox');
  box.style.display = 'block';
};
const closeBox = () => {
  const box = document.getElementById('showBox');
  box.style.display = 'none';
};
const show = async () => {
  await showBox();
  setTimeout(closeBox, 2000);
};
const addPopUpBox = async () => {
  const box = document.createElement('div');
  box.innerHTML = '<h2>Books are loading...Please Wait..</h2>';
  box.id = 'showBox';
  document.getElementById('main').append(box);
};
const main = async () => {
  setLoader();
  addPopUpBox();
  load(booksCSVData);
  addHomePageActions();
  render();
};

window.onload = main;
