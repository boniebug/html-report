const pokemons = [];

const getSprites = (info) => {
  const sprites = {
    Default: {},
    Shiny: {}
  };
  sprites['Default']['frontDefault'] = info.sprites.front_default;
  sprites['Shiny']['frontShiny'] = info.sprites.front_shiny;
  sprites['Default']['backDefault'] = info.sprites.back_default;
  sprites['Shiny']['backShiny'] = info.sprites.back_shiny;
  return sprites;
};

const addWeekness = (info) => {
  const weeknesses = [];
  info.types.forEach(async element => {
    const response = await fetch(element.type.url);
    const parsedResponse = await response.json();
    const damageRelations = parsedResponse.damage_relations.double_damage_from;
    damageRelations.forEach(item => {
      weeknesses.push(item.name);
    });
  });
  return weeknesses;
};

const addDetails = (info, parent, child) => {
  const pokemon = []
  info[parent].forEach(element =>
    pokemon.push(element[child].name));
  return pokemon;
};

const storePokemon = (entry, parsedInfo) => {
  const pokemon = {};
  pokemon['name'] = entry.name;
  pokemon['id'] = parsedInfo.id;
  pokemon['types'] = addDetails(parsedInfo, 'types', 'type');
  pokemon['image'] = parsedInfo.sprites.front_default;
  pokemon['sprites'] = getSprites(parsedInfo);
  pokemon['height'] = parsedInfo.height / 10;
  pokemon['weight'] = parsedInfo.weight / 10;
  pokemon['statistics'] = addDetails(parsedInfo, 'stats', 'stat');
  pokemon['moves'] = addDetails(parsedInfo, 'moves', 'move');
  pokemon['abilities'] = addDetails(parsedInfo, 'abilities', 'ability');
  pokemon['weekness'] = addWeekness(parsedInfo);
  pokemons.push(pokemon);
};

const fetchPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
  const parsedResponse = await response.json();
  const pokemonData = parsedResponse.results;
  for (let index = 0; index < pokemonData.length; index++) {
    try {
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`);
      const parsedInfo = await pokemonResponse.json();
      storePokemon(pokemonData[index], parsedInfo);
    } catch (error) {
      console.log(error);
    }
  }
};