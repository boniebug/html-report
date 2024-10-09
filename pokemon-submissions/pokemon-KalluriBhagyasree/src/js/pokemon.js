let allPokemonDetails = [];
function displayAllPokemons(data) {
    const pokemonContainer = document.getElementById('pokemon');


    const pokemonBlock = document.createElement('div');
    pokemonBlock.className = 'pokemon-block';

    const name = document.createElement('h2');
    name.textContent = data.name;

    const id = document.createElement('p');
    id.textContent = `ID: ${data.id}`;

    const img = document.createElement('img');
    img.src = data.sprites.front_default;

    const type = document.createElement('p');
    let types = '';
    for (let i = 0; i < data.types.length; i++) {
        types += data.types[i].type.name;
        if (i < data.types.length - 1) {
            types += ', ';
        }
    }
    type.textContent = `Type: ${types}`;

    pokemonBlock.appendChild(name);
    pokemonBlock.appendChild(id);
    pokemonBlock.appendChild(img);
    pokemonBlock.appendChild(type);
    pokemonContainer.appendChild(pokemonBlock);

    pokemonBlock.addEventListener('click', () => {
        console.log('clicked');
        displayPokemonDetails(data);
    });
}
function displayPokemonDetails(data) {
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'pokemon-details';

    const height = document.createElement('p');
    height.textContent = `Height: ${data.height}`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${data.weight}`;

    const moves = document.createElement('p');
    moves.textContent = 'Moves: ';
    for (let i = 0; i < data.moves.length; i++) {
        moves.textContent += data.moves[i].move.name;
        if (i < data.moves.length - 1) {
            moves.textContent += ', ';
        }
    }

    const abilities = document.createElement('p');
    abilities.textContent = 'Abilities: ';
    for (let i = 0; i < data.abilities.length; i++) {
        abilities.textContent += data.abilities[i].ability.name;
        if (i < data.abilities.length - 1) {
            abilities.textContent += ', ';
        }
    }

    const statistics = document.createElement('p');
    statistics.textContent = 'Statistics: ';
    for (let i = 0; i < data.stats.length; i++) {
        statistics.textContent += `${data.stats[i].stat.name}: ${data.stats[i].base_stat}`;
        if (i < data.stats.length - 1) {
            statistics.textContent += ', ';
        }
    }

    getPokemonWeaknesses(data.types, processWeaknesses);

    detailsContainer.appendChild(height);
    detailsContainer.appendChild(weight);
    detailsContainer.appendChild(moves);
    detailsContainer.appendChild(abilities);
    detailsContainer.appendChild(statistics);
    
    document.body.appendChild(detailsContainer);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
        detailsContainer.remove();
        overlay.remove();
    });
}

function processWeaknesses(weaknesses) {
    const weaknessesElement = document.createElement('p');
    let weaknessesText = 'Weaknesses: ';
    for (let i = 0; i < weaknesses.length; i++) {
        weaknessesText += weaknesses[i];
        if (i < weaknesses.length - 1) {
            weaknessesText += ', ';
        }
    }
    weaknessesElement.textContent = weaknessesText;
    document.querySelector('.pokemon-details').appendChild(weaknessesElement);
}


function fetching() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302")
.then((response) => response.json())
.then((data) => data.results)
.then((arr) => {
    allPokemonDetails = [];
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        fetch(arr[i].url)
            .then((response) => response.json())
            .then((pokemonData) => {
                    allPokemonDetails.push(pokemonData);
                    displayAllPokemons(pokemonData);
                    getPokemonWeaknesses(pokemonData.types);
            })
            console.log(arr.length);
            count++;
                if (count === arr.length) {
                    setTimeout(() => {
                        loading.style.display = 'none';
                        console.log("working loop");
                    }, 5000);

                }
    }
});
}

function getPokemonWeaknesses(types) {
    const weaknesses = [];
     let completedRequests = 0;
    types.forEach(type => {
        fetch(type.type.url)
            .then(response => response.json())
            .then(result => {
                result.damage_relations.double_damage_from.forEach(weakness => {
                    if (!weaknesses.includes(weakness.name)) {
                        weaknesses.push(weakness.name);
                    }
                });
                 completedRequests++;
                 if (completedRequests === types.length) {
                    processWeaknesses(weaknesses);
                 }
            });
    });
}



window.onload = fetching;