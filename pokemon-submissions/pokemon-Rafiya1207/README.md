# Pokemon-assignment

This webpage shows a collection of 1025 pokemon with their details.

![pokemon webpage image](/src/images/pokemon-webpage.png)

## Table of Contents

- [Features](#features)
    - [Search](#search)
    - [View more details](#view-more-details)
- [APIs](#apis)

### Features

#### Search
---

The search bar helps to search for pokemon(s).

##### Instructions

- Type pokemon name/id/type/moves/statistics/abilities/height/weight in **search bar**.
- Click on **search** button right to search bar.

> Note: The search will not work by hitting/pressing `enter` after typing.

#### View more details
---
This feature displays more details( like abilities, statistics, moves ) about pokemon.

##### Instructions

- Click on **more details** on a pokemon card.

### APIs

This webpage uses [PokeAPI](https://pokeapi.co/).

Base URL: <https://pokeapi.co/api/v2/>

URL: <https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0>
(to fetch all 1025 pokemon information).

End Points: 
- /pokemon/{pokemon id} 
    - To get specific pokemon information.
    - This webpage gets name, id, types, height, weight, abilities, statistics, moves, sprites of pokemon from this API.
        > Example: /pokemon/1
- /type/{type number} 
    - To get pokemon type details.
    - This webpage gets pokemon weekness from this API. 
        > Example: /type/2
