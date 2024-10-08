# pokemon-assignment
# Pokemon Rendering Web Application
+++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++


## Webpage Overview
---------------------

* This website Renders all pokemons from pokemon API.
* The pokemon search application is allows users to search for pokemon by Name, Id and Types.

## Functions
---------------

* searchPokemon(value): Searches for pokemon based on input value.
* searching(): Creates search bar and adds event listener for searching pokemon after loading the page.
* appending(): Appends pokemon details to pokemon container division. This division Shows details about all Pokemons Provided in API.

* generateDefaultData():
    - Generates default pokemon data when API data not available or error in API.
    - it calls  appending Function for Appending the data to html body.

* generatePokemonData():
    - Generates pokemon data from API and creates the html tags dynamically for assigns to the Data of API.
    - it calls  appending Function for Appending the data to html body. 

* getResponse(): Fetches data from pokemon API it returns Response of url if response is not found returns false. 
* renderingPokemons(): Renders pokemon with details(Name, Id, Image, Types).
* generateAllPokemonData(): Generates all pokemon data and renders them.
* fetchingPokemon(): Fetches pokemon data from API.
* removeLoading(): Removes loading Indication.
* loadingPage(): Displays loading Indication.

## Events
----------

* input event on search bar: Triggers search function when user inputs value
* This Event matches the input value and details of pokemon.
* It renders the Matching Pokemon from User Input and Display that pokemon Only.

## Error Handling
-----------------

* Catches errors during execution of getResponse function.

## Using API
----------------

* https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0: Fetches list of pokemon

## USING LANGUAGES AND STYLESHEETS
-------------------------------------

* JavaScript
* HTML
* CSS

## USING RESOURCE 
-------------------

* pokemon API

## Features or Requirements
------------------------------

* Search bar for searching pokemon by name, id and types.
* Loading indicator for fetching data.
* Displays list of pokemon with details from Pokemon Api.
* Handles errors during API data fetching.
