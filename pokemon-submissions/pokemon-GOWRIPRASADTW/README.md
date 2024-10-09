# Pokemon-assignment

## Overview of pokemon website

This application fetches data from the Pokemon API and displays information on site and User can search for any Pokemon by name.

## what are i provided in pokemon website?

- Fetches Pokemon data from the [Pokemon API](https://pokeapi.co).
- Provides a search functionality to filter Pokemon by name.
- Displays images, IDs, types, and statistics for each Pokemon.

## How look of website

- when open a site top of the left side we can the **Pokemon** heading.
- Top of the right side avaiable a **search bar**
  - user can search any Pokemon by name.
- Below the header Pokemons are loading.

## Functions in our website

- **`fetchPokemon()`**
  - Fetches a list of Pokemon from the API.
  - Calls `displayPokemon()` with the fetched data.

- **`displayPokemon(pokemonData)`**
  - Fetches information for each Pokemon.
  - Displays the fetched Pokemon in the container.

- **`searchPokemons()`**
  - The search function is called when the user keyup in the search input field.
  - Filters the displayed Pokemon based on user input.
  - Updates the visibility of Pokemons based on the search input.
  - Remaining Pokemons are disabled until search is cleared.

  


