# Pokémon Website Readme.md

***Read the Documentation Before go to the pokemon website you will get an idea about website.Explore and Enjoy it.***

## Pokémon Website Documentation Contents
>1. [Documentation](#documentation)
>2. [Features](#features)
>3. [Basic Details](#basic-details)
>4. [Additional Information](#additional-information)
>5. [API](#api)
>6. [GitHub](#github)

## Documentation

Welcome to the **Pokémon Website**.. Explore various Pokémon and their details. You can access the Pokémon database, including ID, name, image, types and additional information.Some features like searching for your favorite Pokémon. Learn how to get data from the Pokémon API and find links to the GitHub repository for the code.

## Features

- **Pokémon Data**: Open the website to view data on various Pokémon with their details.There are 1300 pokemons are Available on that site.
- **Search**: Search for your favorite Pokémon by ID, name, or type.
- **Basic Details**:Name, Image, Id and Type of a pokemon.
- **More Details**: Click the button to get additional information about each Pokémon.
- **Additional Information**: When the "More Details" button is clicked, you will get extra details like abilities,height, width, statistics, moves, and weaknesses of each Pokémon.

## Basic Details

- Normal Basic Details of each Pokemon Be like:
- **Pikachu**
  - ![Pikachu](/src/images/download1.png)
  - **ID**: 1
  - **Type**: Electric
  - **MoreDetails**:>>

## Additional Information

- The additional information be like when more details>> button cliks in Basic details:It will show like a popup.
- **Pikachu**
  - ![Pikachu](/src/images/download1.png)
  - **ID**: 1
  - **Type**: Electric
  - **Height**: 0.4 metres
  - **Weight**: 6 kg
  - **Abilities**:Overgrow, Chlorophyll...
  - **Moves**:Tackle, Vine Whip, Razor Leaf ...
  - **Statistics**:hp: 45, attack: 49, defense: 49,    specialAttack: 65, specialDefense: 65, speed: 45
  - **Weakness**: Fire, Flying, Psychic, Ice

## API

The website uses the following API:
>In this api there are 1300 pokemons are available. The pokemon API provides all the details about each pokemon.To get that API follow this link **[pokeapi]( https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0)**.


### Pokémon Data

- **API**: ` https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
- **Response**:
  ```json
  results [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
  ]

- In that above url has additional information will be found.To access that url we get the additonal information.To get the weakness using that type url yow will get the weakness of Pokemon.

### Additional Information API:
**API URL**: `https://pokeapi.co/api/v2/pokemon/1/`
- **Response**:
  ```json
  {
    "name": "pikachu",
    "weight": 6,
    "height": 0.4,
    "types": [
      { "type": { "name": "electric",
                  "url": "https://pokeapi.co/api/v2/type/1/" } }
    ],
    "abilities": [
      { "ability": { "name": "static" } },
      { "ability": { "name": "lightning-rod" } }
    ],
    "moves": [
      { "move": { "name": "thunderbolt" } },
      { "move": { "name": "quick-attack" } }
    ]
  }

## Github

To check the pokemon website code Go to the github Repository check the website for testing or checking Follow this link **[github repositiry]( https://github.com/path-tw/pokemon-JAGADEESH2004PJ)**.