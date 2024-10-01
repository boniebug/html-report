let urlsContainer = [];
let allPokemonsContainer = document.querySelector('#allPokemonsContainer');
let typesContainer = [];  
let seachBar = document.querySelector('#searchBar');
let loadingMessage = document.querySelector('#loadingMessage');;
let loadingMessageContainer = document.querySelector('#loadingMessageContainer');
let pokemonAbilities = [];
let damageDisplayContainer;
let movesDisplayContainer ;



loadingMessage.style.display = 'block';
allPokemonsContainer.style.display = 'none';
seachBar.disabled = true;
seachBar.addEventListener('input', filterPokemons)

function filterPokemons (e) {
  let allPokemons = document.querySelectorAll('.pokemonContainer');
  allPokemons.forEach((pokemon) => {
    let inputContainer = e.target.value.toLowerCase();
    if (!pokemon.innerText.includes(inputContainer)) {
      pokemon.classList.add('hide');
    } else {
      pokemon.classList.remove('hide');
    }
  })
}

fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000')
.then((data) => {
  return data;
})
.then((data) => {
  return data.json();
})
.then((data) => {
  return data.results;
})
.then((data) => {
  for (let i = 0; i < data.length; i++) {
    urlsContainer.push(data[i].url);
  }
  return urlsContainer;
})

.then((data) => {
let container = [];
for (let i = 0; i < data.length; i++) {
container.push( fetch(data[i])
.then((data) => {
  return data.json();
})

.then((data) => {
  let defenceContainer = [];
  for (let i = 0; i < data.forms.length; i++) {
    defenceContainer.push(data.forms[0].url)
  }

  fetch(defenceContainer)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    return data.types;
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      return data[i].type;
    }
  })
  .then((data) => {
    return data.url;  
  })
  .then((data) => {
    fetch(data)
    .then((data) => {
      return data.json();
    })
    .then((data) => { 
      console.log(data.moves)
      
      movesDisplayContainer = document.createElement('div');
      movesDisplayContainer.classList.add('movesContainer');
      for (let i = 0; i < data.moves.length; i++) {
        let movesTag = document.createElement('p');
        movesTag.classList.add('moves');
        movesTag.innerText = `${data.moves[i].name}`;
        movesDisplayContainer.append(movesTag);
      }
      // pokemonDataContainer.append(movesDisplayContainer);


     damageDisplayContainer = document.createElement('div');
      damageDisplayContainer.classList.add('damageDisplay');
      for (let i = 0; i < data.damage_relations.double_damage_from.length; i++) {
        let damageType = document.createElement('p');
        damageType.classList.add('defense');
        damageType.innerText = `${data.damage_relations.double_damage_from[i].name},`;
        damageDisplayContainer.append(damageType);
      }
      // pokemonDataContainer.append(damageDisplayContainer);
    })
  })

  //height and weight
  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = `Height: ${data.height}`;
  pokemonHeight.classList.add('height');
  let pokemonWeight = document.createElement('p');
  pokemonWeight.classList.add('weight');
  pokemonWeight.innerText = `Weight: ${data.weight}`;
  let someContainer = [];

  let pokemonTypes ;
  for (let i = 0; i < data.types.length; i++) {
    someContainer.push(data.types[i].type.name);
  }
  for (let i = 0; i < someContainer.length; i++) {
    pokemonTypes = document.createElement('p');
    pokemonTypes.classList.add('pokemonType');
    pokemonTypes.innerText = `Type: ${someContainer}`;
    pokemonTypes.style.textAlign = 'center';
  }
  //height and weight end


//abilities
  let ability1 = [];
  for (let i = 0; i < data.abilities.length; i++) {
    ability1.push(data.abilities[i])
  }
  let ability2 = [];
  for (let i = 0; i < ability1.length; i++) {
    ability2.push(ability1[i].ability.name)
  }
  let abilityContainer ;
  for (let i = 0; i < ability2.length; i++) {
    abilityContainer = document.createElement('p');
    abilityContainer.classList.add('ability');
    abilityContainer.innerText = `Ability: ${ability2}`;
  }
  //end of abilities


  //stats
  let stats1 = [];
  for (let i = 0; i < data.stats.length; i++) {
    stats1.push(data.stats[i])
  }
  let stats2 = [];
  let typeStats2 = [];
  for (let i = 0; i < stats1.length; i++) {
    stats2.push(stats1[i].base_stat);
    typeStats2.push(stats1[i].stat.name);
  }
  let statsContainer = [];
  for (let i = 0; i < stats2.length; i++) {
    statsContainer.push(`${typeStats2[i]}:${stats2[i]}`)
  }

  let statsOfPokemons ;
  for (let i = 0; i < statsContainer.length ; i++) {
    statsOfPokemons = document.createElement('p');
    statsOfPokemons.classList.add('stats');
    statsOfPokemons.innerText = `${statsContainer}`;
  }
  //end of stats

  let pokemonDiv = document.createElement('div');
  let smallPokemonContainer = document.createElement('div');
  smallPokemonContainer.classList.add('smallPokemonContainer');
  let imageDiv = document.createElement('div');
  imageDiv.classList.add('imageDiv');
  let pokemonDataContainer = document.createElement('div');
  pokemonDataContainer.classList.add('pokemonDataContainer');
  smallPokemonContainer.style.display = 'flex';

  pokemonDiv.classList.add('pokemonContainer');
  let pokemonID = document.createElement('h4');
  pokemonID.classList.add('pokemonID');
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonImage');
  let pokemonName = document.createElement('p');
  let moreInfo = document.createElement('button');
  moreInfo.innerText = 'More Info';
  moreInfo.classList.add('moreInfo');
  pokemonName.classList.add('pokemonName');
  pokemonName.innerText = `Name: ${data.name}`;
  pokemonID.innerText = data.id;
  pokemonImage.src = data.sprites.other["official-artwork"].front_default;
  pokemonImage.alt = data.name;
  pokemonImage.title = data.name;

  allPokemonsContainer.append(pokemonDiv);
  pokemonDiv.append(pokemonID);

  pokemonDiv.append(smallPokemonContainer);
  smallPokemonContainer.append(imageDiv);
  smallPokemonContainer.append(pokemonDataContainer);
  imageDiv.append(pokemonImage);
 
  pokemonDataContainer.append(pokemonName);
  pokemonDataContainer.append(pokemonWeight);
  pokemonDataContainer.append(pokemonHeight);
  pokemonDataContainer.append(abilityContainer);
  pokemonDataContainer.append(pokemonTypes);
  pokemonDiv.append(moreInfo)
  // pokemonDiv.append(statsOfPokemons);
})
 )
}
  return Promise.all(container);
})

.then(() =>{
  loadingMessage.style.display = 'none';
  allPokemonsContainer.style.display = 'flex';
  seachBar.disabled = false;
})
.catch(() => {
  console.log('Error Occured');
})
