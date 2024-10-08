
# Pokémon API Documentation

### This documentation will help you find all the features and the API's used in this website 
------

# Content 

* Here are the content of this website
    * There are total 1300 pokemon's.
    * There is a search box to search the pokemon.
    * You can Click a particular pokemon to know more details of it.

**So Let's know clearly about the contents**

## Pokemon 

Each Pokémon is displayed in a card format.

All the pokemon's that are visible on the web are fetched from [pokemonAPI](https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0)

  So in common we can see 

   * Name
   * Image of the pokemon 
   * ID
   * Type

All the above details are fetched from [pokemon Data](https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0) by specific index

## Search Feature

The User can add the details to be searched in the search bar

Users can type in the name, ID, or type of a Pokémon to filter the displayed results dynamically.

The matched pokemon card will be displayed and the rest will be hidden


## Click Feature for Pokémon

The click feature will display additional information about the Pokémon.

* Here is the detailed information of the Pokémon:
   * Name
   * Image
   * ID
   * Type
   * Height
   * Weight
   * Moves
   * Abilities
   * Stats
   * Weaknesses

**Name**, **Image**, **ID**, and **Type** are fetched in the same way as used for the Pokémon card.

### Height
Height is fetched from the `height` attribute.

### Weight
Weight is fetched from the `weight` attribute.

### Moves
Moves are fetched from `moves[move]`.

### Abilities
Abilities are fetched from `abilities[ability]`.

### Stats
Stats are fetched from `stats`, including:
* HP
* Attack
* Defense
* Etc.

### Weakness
Weaknesses are fetched from `typeData.damage_relations`.

> **Note:** For all the details of the Pokémon, the data is fetched using a loop, and the information is displayed after completing the loop.
