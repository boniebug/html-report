# Pokémon Assignment

***Read the Documentation Before go to the pokemon website you will get an information and idea about website.Explore and Enjoy it.***

## Pokémon Website Documentation Contents
>1. [Introduction](#introduction)
>2. [Features](#features)
>3. [How to Search the Pokemon](#how-to-search-the-pokemon)
>4. [Pokemon Basic Details](#pokemon-basic-details)
>5. [Pokemon Additional Information](#pokemon-additional-information)
>6. [API](#api)

## Introduction

>Welcome to the **Pokémon Website**. Explore various Pokémon and their details. You can access the Pokémon database, including ID, name, image, types and additional information.Some features like searching for your favorite Pokémon. Learn how to get data from the Pokémon API and find links to the Pokemon API.

## Features

>- **Pokémon Data**: Open the website to view data on various Pokémon with their details.There are 1300 pokemons are Available on that site.
>- **Loading Message**: At the time of processing of pokemons the loading message will displayed like a loader in websites.Whenever the all pokemons are rendered the loading message is disappear and 1300 pokemons are display.
>- **popup**: At the time of loading pokemons user try to search handle user actions before rendered and popup says still loading.
>- **Search**: Search for your favorite Pokémon by ID, name, or type.
>- **Basic Details**:Name, Image, Id and Type of a pokemon.
>- **More Details**: Click the button to get additional information about each Pokémon.
>- **Additional Information**: When the 'More Details' button is clicked in Basic Details, you will get extra details like abilities,height, width, statistics, moves, and weaknesses of each Pokémon.

## How to Search the Pokemon
**Search the Favorite pokemon by Name or type or ID**

>1. In the top right on the website there is a search bar.
>2. Type the pokemon name or type or Id on the search bar.
>3. If the Pokémon details are found, it will show dynamically.
>4. Otherwise **No pokemons found** message will dispaly if no pokemons match with your typed details on search bar.

>***Note***: If the user try to search before loading pokemons a small popup message shows **the pokemons are still loading Please wait...**

## Pokemon Basic Details

Normal Basic Details of each Pokemon Be like:
>- **Pikachu**
>- ![Pikachu](/src/images/download1.png)
>- **ID**: 1
>- **Type**: Electric
>- **MoreDetails**:>>

## Pokemon Additional Information

The additional information be like when more details>> button cliks in Basic details:It will show like a popup.
>- **Pikachu**
>- ![Pikachu](/src/images/download1.png)
>- **ID**: 1
>- **Type**: Electric
>- **Height**: 0.4 metres
>- **Weight**: 60 kg
>- **Abilities**:static, lightning-rod.
>- **Moves**:thunderbolt, quick-attack, Mega-punch, Pay-day, Thunder-punch, Slam, Double-kick, Mega-kick, Headbutt, Body-slam, Take-down, Double-edge
>- **Statistics**:hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90
>- **Weakness**: Ground, Grass, Electric, dragon

## API

The website uses the following API:
>In this api there are 1300 pokemons are available. The pokemon API provides all the details about each pokemon.To get that API follow this link **[pokeapi]( https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0)**.


### Pokémon Data

- **API**: ` https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
- **Response**:
- In the above API we have Found the one key that is  array of objects it holds all the pokemons data named as ***results***. In that array of object we can get the details about pokemons.it contains the below code.

  ```json
  [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
  ]


### Extra Information from API URL:
- In that above url has additional information will be found.To access that url we get the additonal information.To get the weakness using that type url yow will get the weakness of Pokemon.

- **API URL**: `https://pokeapi.co/api/v2/pokemon/1/`
- **Response**:

```json
{
  "name": "pikachu",
  "weight": 6,
  "height": 0.4,
  "types": [
    {
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/1/"
      }
    }
  ],
  "abilities": [
    { "ability": { "name": "static" } },
    { "ability": { "name": "lightning-rod" } }
  ],
  "moves": [
    { "move": { "name": "thunderbolt" } },
    { "move": { "name": "quick-attack" } }
  ],
  "stats": [
    { "base_stat": 35, "stat": { "name": "hp" } },
    { "base_stat": 55, "stat": { "name": "attack" } },
    { "base_stat": 40, "stat": { "name": "defense" } },
    { "base_stat": 50, "stat": { "name": "special-attack" } },
    { "base_stat": 50, "stat": { "name": "special-defense" } },
    { "base_stat": 90, "stat": { "name": "speed" } }
  ]
}

