const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const loadingSymbol = document.getElementById('loadingSymbol');


async function fetchPokemons() {
    showLoading(true);
    try {
        pokemonContainer.innerHTML = ''; // Clear previous results
        for (let i = 1; i <= 230; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();
            displayPokemon(data);
        }
        alert('Pokémon data successfully loaded!');
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    } finally {
        hideLoading();
    }
}
async function searchPokemons(query) {
    showLoading(true);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (response.ok) {
            const data = await response.json();
            pokemonContainer.innerHTML = ''; // Clear previous results
            displayPokemon(data);
        } else {
            alert('No Pokémon found!');
        }
    } catch (error) {
        alert('An error occurred while searching for Pokémon.');
        console.error('Search error:', error);
    } finally {
        hideLoading();
    }
}

function displayPokemon(pokemon) {
    const pokemonBox = document.createElement('div');
    pokemonBox.classList.add('pokemon-box');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;

    const pokemonName = document.createElement('div');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = `Name: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;

    const pokemonId = document.createElement('div');
    pokemonId.textContent = `ID: ${pokemon.id}`;

    const pokemonTypes = document.createElement('div');
    pokemonTypes.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;

    pokemonBox.appendChild(pokemonImage);
    pokemonBox.appendChild(pokemonName);
    pokemonBox.appendChild(pokemonId);
    pokemonBox.appendChild(pokemonTypes);

    pokemonContainer.appendChild(pokemonBox);
}
function showLoading(isLoading) {
    loadingSymbol.style.display = isLoading ? 'block' : 'none';
}

function hideLoading() {
    setTimeout(() => {
        loadingSymbol.style.display = 'none';
    }, 5000); // Keeps loading for 5 seconds
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        searchPokemons(query);
    }
});

fetchPokemons();
