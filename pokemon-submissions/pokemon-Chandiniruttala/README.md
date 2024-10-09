# pokemon-assignment

# Pokemon Website Documentation

## Table of Contents

1. Introduction
2. Features
3. How to use this website
4. APIs Used

### Introduction 

This Pokemon website is designed for Convenient access to Pokemon information and it displays a list of Pokemons with their names, IDs, types and other more details, along with a search bar to filter Pokemon by name, ID, or type.

### Features

+ *Pokemon list*
    
  + Displays a list of pokemons with their names, IDs, and types.
  + Each Pokémon card includes:
    + Pokemon image
    + Name
    + ID
    + Types

+ *Loader*
  +  Displays a loader while data is getting fetched.

+ *Search Bar*

  + Filters Pokemon by name, ID, or type.

+ *More details of pokemon*

  + Clicking on a Pokemon card opens a more details which includes:
	+ Height and weight
	+ Moves
	+ Abilities
	+ Statistics
	+ Weaknesses

### How to use this website

1. Open the website in a browser.
2. Use the search bar to find specific Pokémon.
3. Click on a Pokemon card get more details about that particular pokemon.
4. To close the more details, Click on the "x" button.

### APIs Used
  + **[Pokemon API.](https://pokeapi.co/ "https://pokeapi.co/")** - It provides documentation to know pokemon APIs.

  + **/pokeapi.co/api/v2/pokemon/?offset=0&limit=1302** -  It provides the all available pokemons.

  + **/pokeapi.co/api/v2/pokemon/{id}** - Retrieves Pokemon details (id, name, types, sprites, height, weight, moves, abilities, statistics).

  + **/pokeapi.co/api/v2/type/{type_id}** - Retrieves Pokémon weaknesses
