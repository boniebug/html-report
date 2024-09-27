
const showLoader = () => {
  const container = document.querySelector('main')
  const loadIcon = document.createElement('div')
  loadIcon.className = 'loading-icon';
  container.appendChild(loadIcon);
};

const appendCards = () => {
  const container = document.getElementById('pokemonsContainer');
  for (const pokemon of allPokemonsData) {
    const card = createCard(pokemon);
    container.appendChild(card);
  }
};

const filterPokemons = () => {
  const searchedData = document.getElementById('searchBar').value;
  for(const pokemon of allPokemonsData){
    const pokemonCard =   document.getElementById(pokemon.id)
    if(pokemon.name.includes(searchedData) || pokemon.type.includes(searchedData)){
      pokemonCard.style.display = 'none'
    }else{
      pokemonCard.style.display = 'flex'
    }
  }
};

window.onload = () => {
  showLoader()
  const container = document.querySelector('main');
  const loader = document.querySelector('.loading-icon')
  document.getElementById("searchBar").addEventListener('keypress',filterPokemons);
  createPokemonsData().then(() => {
    appendCards();
    container.removeChild(loader);
  })
}

// window.onscroll = () => {
//   // console.log('reached end')
// if(window.scrollY = window.innerHeight >= document.documentElement.scrollHeight){
//   console.log('reached end');
//   appendCards()
// }
// }