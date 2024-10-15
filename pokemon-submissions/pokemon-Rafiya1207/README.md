# Pokemon-assignment

This webpage shows a collection of 1025 pokemon with their details.

![pokemon webpage image](/src/images/pokemon-webpage.png)

## Table of Contents

- [Pokemon Cards Overview](#pokemon-cards-overview)
- [Features](#features)
    - [Search](#search)
    - [View more details](#view-more-details)
- [APIs](#apis)

### Pokemon Cards Overview

**Pokemon Card** has the following details
- Name
- Id
- Types
- *more details* link to view more details about the pokemon [read more](#view-more-details)

### Features

#### Search
---

The search bar allows to find specific pokemon(s).

##### Instructions

- Type pokemon name/id/type/height/weight/statistics/abilities/weekness/moves in **search bar**.
- Click on **search** button right to search bar.

> Note: The search will not work by hitting/pressing `enter` after typing.

##### About

Case-insensitive search.

If a part of name/id/type/height/weight/statistics/abilities/weekness/moves are specified then pokemons related to that part will be displayed.

If no matching pokemon(s) are found, then no results message will be displayed.

#### View more details
---
![pokemon webpage popup image](/src/images/pokemon-webpage-popup.png)

This feature open ups a pop up to display
- sprites - both default and shiny with front and back views
- name
- id
- types
- height
- weight
- abilities
- statistics
- weeknesses
- moves

##### Instructions

- Click on **more details** on a pokemon card.

### APIs

This webpage uses [PokeAPI](https://pokeapi.co/).

Base URL: <https://pokeapi.co/api/v2/>

End Points: 
- [/pokemon?limit=1025&offset=0](https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0)
    - To get all 1025 pokemon information.
    - This webpage gets name and url for the pokemon information.

- [/pokemon/1](https://pokeapi.co/api/v2/pokemon/1)
    - To get the pokemon information.
    - This webpage gets id, types, height, weight, abilities, statistics, moves, sprites of pokemon from this API.

- [/type/2](https://pokeapi.co/api/v2/type/2)
    - To get pokemon type details.
    - This webpage gets pokemon weekness from this API. 
