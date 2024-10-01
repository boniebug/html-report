async function fetchPokemon() {
  let loading = true;
  const loader = document.getElementById('loader');
  const pokemonContainer = document.getElementById('mainContainer');
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1032&offset=0');
    const data = await response.json();
    for (const element of data.results) {
      try {
        const pokemonResponse = await fetch(element.url);
        const pokemonData = await pokemonResponse.json();
        const pokemonName = pokemonData.name;
        const pokemonId = pokemonData.id;
        const pokemonImgRefSrc = pokemonData.sprites.other['official-artwork']['front_shiny'];
        const pokemonImgSrc = pokemonImgRefSrc || pokemonData.sprites['front_default'];
        const pokemonRefType = pokemonData.types;
        let pokemonType;
        pokemonRefType.forEach((element) => {
        pokemonType = element.type.name;
        });
        displayPokemon(pokemonName, pokemonId, pokemonImgSrc, pokemonType,loading,loader);
      } catch (error) {
        console.log(error);
      }
    }
   
     loader.style.display = 'none';
     pokemonContainer.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
};

function displayPokemon(name, id, imgSrc, type,loadingStatus,loader) { 
  const pokemonContainer = document.getElementById('container');
  const pokemonElement = document.createElement("div");
  pokemonElement.setAttribute('class','pokemonDetailer');
  const imageElement = document.createElement("img");
  imageElement.src = imgSrc;
  imageElement.alt = 'image is not available';
  pokemonElement.appendChild(imageElement);

  const nameElement = document.createElement("h2");
  nameElement.textContent = 'NAME :' + name;
  pokemonElement.appendChild(nameElement);

  const idElement = document.createElement("p");
  idElement.textContent = "ID :" + id;
  pokemonElement.appendChild(idElement);

  const typeElement = document.createElement("p");
  typeElement.textContent = " TYPE :" + type;
  pokemonElement.appendChild(typeElement);

pokemonElement.addEventListener('click',() => detailInView(idElement.textContent,pokemonContainer));

  pokemonContainer.appendChild(pokemonElement);
  if(loadingStatus) {
    loader.style.display = 'block';
    document.getElementById('mainContainer').style.display = 'none';
  }
}

function fetchSearch() {
  const loaderContext = document.getElementById('loaderContext');
  const loader = document.getElementById('loader');
  const searchType = document.getElementById('searchType').value;
  const searchValue = document.getElementById('search').value;
  const pokemonContainer = document.getElementById('container');
  pokemonContainer.textContent = '';
  if(searchType === 'name or id') {
   fetch('https://pokeapi.co/api/v2/pokemon/'+searchValue+'/')
   .then((response) => response.json())
   .then((data) => { 
   searchValue.innerTEXT = ''
   const  pokemonName = data.name;
   const pokemonId = data.id;
   const  pokemonType = data.types.forEach((element) =>element.type.name);
   const  pokemonImgRefSrc = data.sprites.other['official-artwork']['front_shiny'];
   const  pokemonImgSrc = pokemonImgRefSrc || data.sprites['front_default'];
   loader.style.display = 'none';
   displayPokemon(pokemonName, pokemonId, pokemonImgSrc, pokemonType);
   }).catch((error) => {
     pokemonContainer.textContent = '';
    loaderContext.textContent = 'incorrect details';
    loader.style.display = 'block';
    setTimeout(() => {
      loader.style.display = 'none';
      loaderContext.textContent = 'loading...';
      fetchPokemon();
    },2000)
   })
  } else {
      fetch('https://pokeapi.co/api/v2/type/'+searchValue+'/')
      .then((response) => response.json())
      .then((data) => {
      const pokemonDetails = data.pokemon;
      for (element of pokemonDetails){
        fetch(element.pokemon.url)
        .then((response) => response.json())
        .then((data) => { 
        searchValue.innerTEXT = '';
        const  pokemonName = data.name;
        const pokemonId = data.id;
        const pokemonType = data.types.map((element) => element.type.name);
        const  pokemonImgRefSrc = data.sprites.other['official-artwork']['front_shiny'];
        const  pokemonImgSrc = pokemonImgRefSrc || data.sprites['front_default'];
        loader.style.display = 'none';
        displayPokemon(pokemonName, pokemonId, pokemonImgSrc, pokemonType);
   }).catch(() => {
      pokemonContainer.textContent = '';
      loaderContext.textContent = 'incorrect details';
      loader.style.display = 'block';
      setTimeout(() => {
      loader.style.display = 'none';
      loaderContext.textContent = 'LOADING..'
      fetchPokemon();
    },2000)
   })
          }
   }).catch(() => {
    pokemonContainer.textContent = '';
    loaderContext.textContent = 'incorrect details';
    loader.style.display = 'block';
    setTimeout(() => {
    loader.style.display = 'none';
    loaderContext.textContent = 'LOADING..'
    fetchPokemon();
    },2000)
   })
  }
};

function closeSearch() {
  fetchPokemon();
};

function detailInView(id,pokemonContainer) {
  const pokemonDetailer = document.getElementById('detailViewer');
  const detailCloseButton = document.createElement('button');
  detailCloseButton.setAttribute('id','detailButton');
  detailCloseButton.textContent = '❌';
  detailCloseButton.style.display = 'block';
  const pokemonHeight = document.createElement('p');
  const pokemonWeight = document.createElement('p');
  const pokemonAbilities = document.createElement('p');
  const pokemonMoves = document.createElement('p');
  const pokemonStats = document.createElement('p');
  let pokemonWeakness = document.createElement('p');
  pokemonDetailer.style.display = 'block';
  pokemonContainer.style.pointerEvents = 'none';
  pokemonContainer.style.opacity = '0.4';
 fetch('https://pokeapi.co/api/v2/pokemon/'+id.substring(4)+'/')
   .then((response) => response.json())
   .then((data) => { 
   pokemonHeight.textContent = 'height :'+data.height;
   pokemonWeight.textContent = 'weight :'+data.weight;
   pokemonAbilities.textContent = 'abilites :'+data.abilities.map((element) => element.ability.name);
   pokemonMoves.textContent = 'moves :'+data.moves.map((element) => element.move.name);
   pokemonStats.textContent = 'stats :'+data.stats.map((element) => element.stat.name);
   data.types.forEach((element) => fetch(element.type.url)
   .then((response) => response.json())                    
   .then((data) => pokemonWeakness.textContent = 'weakness :'+data.damage_relations.double_damage_from.map((element) => element.name)))
   })
   pokemonDetailer.appendChild(detailCloseButton);
   pokemonDetailer.appendChild(pokemonHeight);
   pokemonDetailer.appendChild(pokemonWeight);
   pokemonDetailer.appendChild(pokemonAbilities);
   pokemonDetailer.appendChild(pokemonMoves);
   pokemonDetailer.appendChild(pokemonStats);
   pokemonDetailer.appendChild(pokemonWeakness);

   detailCloseButton.addEventListener("click",() => closeDetailer());
};
 
 function closeDetailer () {
  document.getElementById('detailViewer').style.display = 'none';
  document.getElementById('container').style.opacity = '1';
  document.getElementById('container').style.pointerEvents = 'auto';
  document.getElementById('detailViewer').textContent = ''
 };

window.onload = fetchPokemon;