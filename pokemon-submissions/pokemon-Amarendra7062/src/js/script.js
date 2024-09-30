document.addEventListener('DOMContentLoaded', function() {
    const pokemonContainer = document.getElementById('pokemon-container');
    const searchBar = document.getElementById('search-bar');
    const loadingElement = document.querySelector('.loading');
  
    let allPokemon = [];
  
    setTimeout(() => {
      fetchPokemons();
    }, 5000);
  
    loadingElement.textContent = "Loading...";
    
    function fetchPokemons() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0')
        .then(response => response.json())
        .then(data => {
          allPokemon = data.results;
          loadPokemonDetails();
          loadingElement.style.display = 'none'; // Hide the loading text
        });
    }
  
    function loadPokemonDetails() {
      let i = 0;
      while (i < allPokemon.length) {
        let url = allPokemon[i].url;
        fetch(url)
          .then(response => response.json())
          .then(pokemon => {
            createPokemonBox(pokemon);
          });
        i++;
      }
    }
  
    function createPokemonBox(pokemon) {
      const pokemonBox = document.createElement('div');
      pokemonBox.classList.add('pokemon-box');
  
      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;
      const name = document.createElement('h4');
      name.textContent = `#${pokemon.id} ${pokemon.name}`;
  
      const types = document.createElement('p');
      let typeText = 'Types: ';
      for (let i = 0; i < pokemon.types.length; i++) {
        typeText += pokemon.types[i].type.name + ' ';
      }
      types.textContent = typeText;
  
      const detailsBtn = document.createElement('button');
      detailsBtn.textContent = 'Show Details';
  
      const details = document.createElement('div');
      details.classList.add('details');
  
      const height = document.createElement('p');
      height.textContent = `Height: ${pokemon.height}`;
      const weight = document.createElement('p');
      weight.textContent = `Weight: ${pokemon.weight}`;
  
      const moves = document.createElement('p');
      let moveText = 'Moves: ';
      for (let j = 0; j < Math.min(pokemon.moves.length, 5); j++) {
        moveText += pokemon.moves[j].move.name + ' ';
      }
      moves.textContent = moveText;
  
      const abilities = document.createElement('p');
      let abilityText = 'Abilities: ';
      for (let k = 0; k < pokemon.abilities.length; k++) {
        abilityText += pokemon.abilities[k].ability.name + ' ';
      }
      abilities.textContent = abilityText;
  
      const stats = document.createElement('p');
      let statsText = 'Stats: ';
      for (let l = 0; l < pokemon.stats.length; l++) {
        statsText += `${pokemon.stats[l].stat.name}: ${pokemon.stats[l].base_stat} `;
      }
      stats.textContent = statsText;
  
      const weaknesses = document.createElement('p');
      weaknesses.textContent = 'Weaknesses: TBD';
  
      details.appendChild(height);
      details.appendChild(weight);
      details.appendChild(moves);
      details.appendChild(abilities);
      details.appendChild(stats);
      details.appendChild(weaknesses);
  
      detailsBtn.addEventListener('click', function() {
        if (details.style.display === 'none') {
          details.style.display = 'block';
          detailsBtn.textContent = 'Hide Details';
        } else {
          details.style.display = 'none';
          detailsBtn.textContent = 'Show Details';
        }
      });
  
      pokemonBox.appendChild(img);
      pokemonBox.appendChild(name);
      pokemonBox.appendChild(types);
      pokemonBox.appendChild(detailsBtn);
      pokemonBox.appendChild(details);
  
      pokemonContainer.appendChild(pokemonBox);
    }
  
    searchBar.addEventListener('input', function() {
      const searchValue = searchBar.value.toLowerCase();
      const pokemonBoxes = pokemonContainer.getElementsByClassName('pokemon-box');
  
      for (let i = 0; i < pokemonBoxes.length; i++) {
        const pokemonBox = pokemonBoxes[i];
        const pokemonName = pokemonBox.querySelector('h4').textContent.toLowerCase();
        const pokemonTypes = pokemonBox.querySelector('p').textContent.toLowerCase();
  
        if (pokemonName.includes(searchValue) || pokemonTypes.includes(searchValue)) {
          pokemonBox.style.display = '';
        } else {
          pokemonBox.style.display = 'none';
        }
      }
    });
  });
  