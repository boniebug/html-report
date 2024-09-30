
const showLoader = () => {
  const container = document.querySelector('main');
  const loader = document.createElement('div');
  loader.className = 'loader';
  container.appendChild(loader);
};

const fetchAndAppendPokemons = async (count) => {
  const container = document.getElementById('pokemonsContainer');
  const shortList = await createPokemonsData(count - 100, count);
  appendCards(shortList, container);
};

const loadShortList = () => {
  let count = 200;
  let length = dataOfAllpokemons.names.length;
  
  window.onscroll = () => {
    const documentHeight = document.documentElement.scrollHeight;
    if (window.scrollY + window.innerHeight >= documentHeight && count <= length) {
      fetchAndAppendPokemons(count);
      count += 100;
      if (count > length) {
        count = length - 1;
        fetchAndAppendPokemons(count).then(() => {
          removeLoader();
        })
        window.onscroll = null;
      }
    }
  };

};

const removeLoader = () => {
  const container = document.querySelector('main');
  const loader = document.querySelector('.loader');
  if (loader) {
    container.removeChild(loader);
  }
}




window.onload = async () => {
  showLoader();
  await fetchNamesAndTypes()
  await fetchAndAppendPokemons(100)
  loadShortList();

  document.querySelector('.searchIcon').addEventListener('click', getSerachResults);
};
