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
The types of each pokemon is retrived from types array that contains an object for each type.
#### Moves
The moves of each pokemon is retrived from an array of objects and each object of array refers to each move containing name of the move and version_group_details.
#### Weakness
The weakness of the  pokemon depends on the type it belongs to, the weakness denotes that from which types of pokemons does it get harmed.
using the URL ```https://pokeapi.co/api/v2/type/${type.name}``` we retrive a json data of pokemons type which contains details like from which the pokemon get damage from and to which pokemons does it can damage and etc.
weaknesses are retrived from double_damage_from key of damage_relations_object.

>Note: The ${type.name} is replaced with the type of pokemon.

#### Abilities


## Features

Pokemon website contains Multiple features like ***Loading***, ***Search***, ***Show Details***.

