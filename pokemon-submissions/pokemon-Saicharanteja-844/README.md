

# Pokemon Website Documentation


## Overview


The Pokemon website is a web application that provides information about various Pokemon. It allows users to search for Pokemon by name, ID, or type, and displays detailed information about each Pokemon, including its name, ID, type, height, weight, moves, abilities, and weaknesses.

## Features
The Pokemon website has the following features:
- ## Search Bar:
  Users can search for Pokemon by name, ID, or type using the search bar.
- ## Home Button:
  Users can click the home button to return to the main page, which displays a list of all Pokemon.
- ## Pokemon Cards:
  Each Pokemon is displayed on a card, which includes its name, ID, type, and image.
- ## Modal Window:
  When a user clicks on a Pokemon card, a modal window appears, displaying detailed information about the Pokemon, including its name, ID, type, height, weight, moves, abilities, and weaknesses.
- ## Loader Animation: 
  A loader animation is displayed while the data is being fetched from the API.
# API Documentation
The Pokemon website uses the following APIs:

- ## PokeAPI: 
   The PokeAPI is used to fetch data about Pokemon, including their name, ID, type, height, weight, moves, abilities, and weaknesses.
- ## Type API: 
The Type API is used to fetch data about the weaknesses of each type.

The following endpoints are used:

- ## https://pokeapi.co/api/v2/pokemon/: 
   This endpoint is used to fetch data about a specific Pokemon.
- ## https://pokeapi.co/api/v2/pokemon?limit=1032:
    This endpoint is used to fetch data about all Pokemon.
- ## https://pokeapi.co/api/v2/type/{type_name}/: 
  This endpoint is used to fetch data about the weaknesses of a specific type.

# Data Consumed
The following data is consumed from the APIs:

- ## Pokemon Data: 
   The name, ID, type, height, weight, moves, abilities, and weaknesses of each Pokemon.
- ## Type Data: 
    The weaknesses of each type.

# How to Use
To use the Pokemon website, follow these steps:

1. Open the website in a web browser.
2. Use the search bar to search for a Pokemon by name, ID, or type.
3. Click on a Pokemon card to view its detailed information in a modal window.
4. Click the home button to return to the main page, which displays a list of all Pokemon.

## The following functions are used in the JavaScript file:

-  **createLoader():** Creates a loader animation.
- **displayInitialResults():** Displays the initial list of Pokemon.
- **displaySearchResults():** Displays the search results.
- **createModal():** Creates a modal window for a Pokemon.
- **getPokemonData():** Fetches data about a specific Pokemon from the API.
- **getAllPokemonData():** Fetches data about all Pokemon from the API.
- **filterPokemon():** Filters the list of Pokemon based on the search input.
- **addSearchButtonEventListener():** Adds an event listener to the search button.
- **addHomeButtonEventListener():** Adds an event listener to the home button.
# Variables
The following variables are used in the JavaScript file to handle the pokemon data :

1. `pokemonDataList:` An array of Pokemon data.
2. `filteredPokemon:` An array of filtered Pokemon data.
3. `searchInput:` The search input value.
4. ``pokemonInfoSection:`` The element that displays the Pokemon information.
5. `loaderContainer:` The element that displays the loader animation.
6. `modalContainer:` The element that displays the modal window.
