const fetchData = async (index) => {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${index}&limit=100`)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => console.error("Error in fetchData:", error));
};

const getPromises = async () => {
  const count = await fetch('https://pokeapi.co/api/v2/pokemon/')
    .then((response) => { return response.json() })
    .then((response) => { return response.count })
    .catch((error) => {
      console.log(error);
    })
  const promiseArray = [];
  for (let index = 0; index < count; index += 100) {
    promiseArray.push(fetchData(index));
  }
  return promiseArray;
};

const getTypes = (data) => {

  return new Promise((resolve, reject) => {
    const types = [0];
    data.types.forEach((typeName) => {
      types.push(typeName.type.name)
    });
    resolve(types);
  })
};

const getWeakness = async (types) => {
  const weakTypes = [];
  for (const typeName of types) {
    await fetch(`https://pokeapi.co/api/v2/type/${typeName}/`)
      .then((response) => { return response.json() })
      .then((response) => {
        for (const type of response.damage_relations.double_damage_from) {
          weakTypes.push(type.name);
        }
      })
  }
  return weakTypes;
};

const createData = async (response) => {
  const pokemonData = {};
  pokemonData.type = response.types.map((typeObject) => {return typeObject.type.name});
  pokemonData.id = response.id;
  pokemonData.name = response.name;
  pokemonData.imageUrl = response.sprites.other.dream_world.front_default || response.sprites.front_default;
  pokemonData.base = response.base_experience || 'UN-BEATEABLE';
  pokemonData.height = response.height;
  pokemonData.weight = response.weight;
  pokemonData.stats = response.stats.map((statObject) => {return {value : statObject.base_stat, name : statObject.stat.name}});
  pokemonData.moves = response.moves.map((moveObject) => { return moveObject.move.name })
  pokemonData.abilities = response.abilities.map((abilitieObject) => { return abilitieObject.ability.name })
  pokemonData.weakness = await getWeakness([...pokemonData.type]);
  return pokemonData;
};

const pokemonDataArray = [];
const getSinglePokemon = async (url) => {
  return await fetch(url)
    .then((response) => { return response.json() })
    .then(async (response) => {
      const pokemonData = await createData(response);
      pokemonDataArray.push(pokemonData);
      return pokemonData;
    })
    .catch((error) => {
      console.log('error : ' + error);
    })
};
const getData = async () => {
  try {
    const promises = await getPromises();
    const results = await Promise.all(promises);
    const urlArray = results.flat(10).map((pokemon) => pokemon.url);
    await Promise.all(urlArray.map((url) => getSinglePokemon(url)));
    const sortedData = pokemonDataArray.sort((pokemonOne, pokemonTwo) => pokemonOne.id - pokemonTwo.id);
    sortedData.forEach((data) => {
      addPokemon(data)
    });
    document.getElementById('loader').classList.add('hide');
  }
  catch (error) {
    console.error(error);
  }
};

