const getAbilities = (pokemon) => {
  const abilitiesList = pokemon.abilities;
  return abilitiesList.map((a) => a.ability.name);
};

const getPokemonMoves = (pokemon) => {
  const movesList = pokemon.moves;
  return movesList.map((m) => m.move.name);
};
const getPokemonStats = (pokemon) => {
  const pokemonStats = pokemon.stats;
  const statsInfo = pokemonStats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }));
  return statsInfo;
};

const getPokemonWeakness = (pokemon) => {
  const typeUrls = pokemon.types.map((t) => t.type.url);

  return Promise.all(
    typeUrls.map((url) => fetch(url).then((res) => res.json()))
  );
};