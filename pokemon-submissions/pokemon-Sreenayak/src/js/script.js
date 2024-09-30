'use strict';

const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loadingSymbol = document.getElementById('loadingSymbol');
const modal = document.getElementById('modal');
const modalInfo = document.getElementById('modal-info');
const closeModal = document.querySelector('.close');

async function fetchPokemons() {
    showLoading(true);
    const pokemons = [];
    for (let i = 1; i <= 20; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        if (response.ok) {
            pokemons.push(await response.json());
        }
    }
    hideLoading();
    return pokemons;
}

function displayPokemon(pokemon) {
    const pokemonBox = document.createElement('div');
    pokemonBox.classList.add('pokemon-box');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;

    const pokemonName = document.createElement('div');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const pokemonId = document.createElement('div');
    pokemonId.textContent = `ID: ${pokemon.id}`;

    const pokemonType = document.createElement('div');
    pokemonType.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(', ')}`;

    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Extra details';
    detailsButton.onclick = () => showDetails(pokemon);

    pokemonBox.append(pokemonImage, pokemonName, pokemonId, pokemonType, detailsButton);
    pokemonContainer.appendChild(pokemonBox);
}

function showDetails(pokemon) {
    const title = document.createElement('h2');
    title.textContent = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;

    const height = document.createElement('p');
    height.textContent = `Height: ${pokemon.height / 10} m`;

    const weight = document.createElement('p');
    weight.textContent = `Weight: ${pokemon.weight / 10} kg`;

    let stats = '';
    pokemon.stats.forEach(s => {
        stats += `${s.stat.name}: ${s.base_stat}, `;
    });
    stats = stats.slice(0, -2);
    const statsElement = document.createElement('p');
    statsElement.textContent = `Stats: ${stats}`;

    let abilities = '';
    pokemon.abilities.forEach(a => {
        abilities += `${a.ability.name}, `;
    });
    abilities = abilities.slice(0, -2);
    const abilitiesElement = document.createElement('p');
    abilitiesElement.textContent = `Abilities: ${abilities}`;

    const weaknesses = getWeaknesses(pokemon.types).join(', ');
    const weaknessesElement = document.createElement('p');
    weaknessesElement.textContent = `Weaknesses: ${weaknesses}`;

    modalInfo.innerHTML = '';
    modalInfo.appendChild(title);
    modalInfo.appendChild(height);
    modalInfo.appendChild(weight);
    modalInfo.appendChild(abilitiesElement);
    modalInfo.appendChild(statsElement);
    modalInfo.appendChild(weaknessesElement);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}


function getWeaknesses(types) {
    const typeWeaknesses = {
        fire: ['water', 'rock', 'ground'],
        water: ['electric', 'grass'],
        grass: ['fire', 'bug', 'flying', 'ice', 'poison'],
        // Add more types and their weaknesses...
    };

    const weaknesses = new Set();
    types.forEach(type => {
        const typeName = type.type.name;
        if (typeWeaknesses[typeName]) {
            typeWeaknesses[typeName].forEach(weakness => weaknesses.add(weakness));
        }
    });
    return Array.from(weaknesses);
}

function showLoading(isLoading) {
    loadingSymbol.style.display = isLoading ? 'block' : 'none';
}

function hideLoading() {
    loadingSymbol.style.display = 'none';
}

fetchPokemons().then(pokemons => {
    pokemons.forEach(displayPokemon);
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        pokemonContainer.innerHTML = '';
        fetchPokemons().then(pokemons => {
            const filteredPokemons = pokemons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
            filteredPokemons.forEach(displayPokemon);
        });
    } else {
        pokemonContainer.innerHTML = '';
        fetchPokemons().then(pokemons => pokemons.forEach(displayPokemon));
    }
});

closeModal.onclick = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};