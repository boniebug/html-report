 const loader = () => {
  const loading = document.getElementById('loader');
  setTimeout(() => {
    fetchPokemon();
    loading.style.display = 'none'
  },5000)
 };
 
 async function  fetchPokemon() {
  try {
  const  pokemonContainer = document.getElementById('container');
  await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
       data.results.map((cartoon) => {
        try{
            fetch(cartoon.url)
            .then((response) =>response.json())
            .then((pokemonData) => {
                const pokemonElement = document.createElement("div");
                const imageElement = document.createElement("img");
                imageElement.src = pokemonData.sprites.front_default;
                imageElement.alt = pokemonData.name;
                pokemonElement.appendChild(imageElement);

                const nameElement = document.createElement("h2");
                nameElement.textContent ='NAME :'+ pokemonData.name;
                pokemonElement.appendChild(nameElement);

                const idElement = document.createElement("p");
                idElement.textContent = "ID :" + pokemonData.id;
                pokemonElement.appendChild(idElement);

                const typeElement = document.createElement("p");
                typeElement.textContent = " TYPE :" +pokemonData.types.map((pokemonType) => pokemonType.type.name);
                pokemonElement.appendChild(typeElement);
                pokemonContainer.appendChild(pokemonElement);
              });}
            catch(error){
              console.error(error);
            }
          });
        });}catch (error) {
          console.log(error);
        }
 };

 const fetchSearch =  () => {
  const  searchInput = document.getElementById('search').value;
  const searchType = document.getElementById('searchType').value;
  const pokemonContainer = document.getElementById('container');
  pokemonContainer.textContent = '';

  fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.json())
    .then((data) => {
      const pokemonList = data.results;
      if(searchType === 'id') {
        pokemonList.map((cartoon) => {
          if (cartoon.url.split('/')[cartoon.url.split('/').length - 2] === searchInput) {
            fetch(cartoon.url)
              .then((response) => response.json())
              .then((pokemonData) => {
                displayPokemon(pokemonData, pokemonContainer);
              })
          }
        })
      } else if(searchType === 'name') {
        pokemonList.map((cartoon) => {
          if (cartoon.name.includes(searchInput.toLowerCase())) {
            fetch(cartoon.url)
              .then((response) => response.json())
              .then((pokemonData) => {
                displayPokemon(pokemonData, pokemonContainer);
              })
          }
        })
      }
    })
    .catch((error) => {
      console.error(error);
    })
};

const displayPokemon = (pokemonData, pokemonContainer) => {
  const pokemonElement = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = pokemonData.sprites.front_default;
  imageElement.alt = pokemonData.name;
  pokemonElement.appendChild(imageElement);

  const nameElement = document.createElement("h2");
  nameElement.textContent ='NAME :' + pokemonData.name;
  pokemonElement.appendChild(nameElement);

  const idElement = document.createElement("p");
  idElement.textContent = "ID :" + pokemonData.id;
  pokemonElement.appendChild(idElement);

  const typeElement = document.createElement("p");
  typeElement.textContent = " TYPE :" + pokemonData.types.map((pokemonType) => pokemonType.type.name);
  pokemonElement.appendChild(typeElement);
  pokemonContainer.appendChild(pokemonElement);
};
window.onload = () => {
  loader();
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {fetchSearch()});
  };