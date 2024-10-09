# Pokemon 

## Table of contents

1. About
1. API
    * PokeAPI
    * Details
    * List of Details
1. Features
    * Loading.
    * Search.
    * Show Details.

## About

_**PokePoke**_ is a pokemon website that displays around _1302_ Pokemons details.
This website uses some APIs with which we render the data of the pokemons.

## API

Using JavaScript ``` fetch() ``` function we fetch and render the Data related to the pokemons from ***PokeAPI***.

### PokeAPI

PokeAPI is an API that contails all pokemons data and details of each pokemon.<br>
The following are the API urls that are used to render different details of the pokemons.

| URL | Reason |
|:----:|:-----:|
|https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0| Render maximum pokemons|
|https://pokeapi.co/api/v2/pokemon/1/ |To display each pokemon data|
|https://pokeapi.co/api/v2/type/fantasy|to get weakness of a pokemon|

## Details

The pokemon details are fetched from ```https://pokeapi.co/api/v2/pokemon/1/ ```.<br>
The data that is retrived using above url is in the ```Json``` format.
which is later converted into object using ```json()``` and displays the details of the pokemon.

### List of Details

* Name
* Id
* Image
* Types
* Moves
* Weakness
* Abilities
* Statistics

#### Name

The name of the pokemon is retrived using the key *name*.

#### Id

The The ID denotes the Id of the pokemon.

#### Image

The image url is retrived from the front_default of the official_artwork from others of sprites of json file.

```json
"sprites": {
  "other": {
    "official-artwork": {
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png"
    }
  }
}
```
#### Type

Type defines the the type of the pokemon like *flying, grass, fire, water, etc.,* <br>
The types of each pokemon is retrived from types array that contains an object for each type.

#### Moves

The moves of each pokemon is retrived from an array of objects and each object of array refers to each move containing name of the move and version_group_details.

#### Weakness

The weakness of the  pokemon depends on the type it belongs to, the weakness denotes that from which types of pokemons does it get harmed.
using the URL ```https://pokeapi.co/api/v2/type/${type.name}``` we retrive a json data of pokemons type which contains details like from which the pokemon get damage from and to which pokemons does it can damage and etc.
weaknesses are retrived from double_damage_from key of damage_relations_object.

>Note: The $\{type.name\} is replaced with the type of pokemon.

#### Abilities

The abilities of a pokemon shows all the abilities that the pokemon posses like *overgrow, chlorophyll, etc.,<br>
The abilities are retrived from the ability object of abilities array of json file that is retrived using the pokemon URL.

#### Statistics

statistics determine certain aspects of battles. Each Pokémon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles.<br>
we retrive the stat_name, base_stat and effort from stat object of stats array.

## Features

Pokemon website contains Multiple features like ***Loading***, ***Search***, ***Show Details***.

### Loading

The Loading feature shows Disclaims the user that the page is loading.<br>
while loading, the browser renders all related data of all the pokemons from https://pokeapi.com using ```fetch()```.

### Search

The search featrue enables the user to find a specific pokemon based on its name, type or Id.

### Show Details

The show details button displays all details of the pokemon in a container at the right side of the screen.
Details that has multiple values are displayed in the form of unordered list.<br>
Close button in the container is used to close the container.