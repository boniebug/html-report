# Pokémon-WORLD
In this Pokemon world you can see the *complete collection* of 
**Pokémons**.
Good *site* for All Pokémon lovers.

# Getting started
In this documentation we'll cover the following elements
- **Introductuon**
- **Features**
- **How to use**
- **Dependencies - APIs**

## Introduction
This Pokémon World will cover all the Pokémons and will show the basic details of each Pokémon at the beginning.

The Basic details are: 
- Pokémon's Name
- Pokémon's Id
- Pokémon's Image
- Pokémon's Type

Here you can see **1302 Pokémons** which played roles from season 1 to the latest.

The 1302 Pokemons are fetched from API and then created into necessary HTML through **JS**.

The gateway for this code is `script.js`. It will initiate all the remaining **JS code**.

>### flow of JS 
>- will dispaly a loader and hold it until data arrives.
>- make API calls to fetch data.
>- will create the DOM for the fetched Data.
>- will remove the earlier loader
>- add necessary Event listeners to the respective elements.

## Features

In Pokémon's World these following features you'll have

- Basic details of each pokemon
- Vast collection of pokemons
- Can search pokemon with any of its basic detail i.e.
    + Name
    + Id
    + Type
- Will provide more details on a click
    + Height & Weight
    + Moves
    + Abilities
    + Stats
    + Weakness

## How to use

This webiste itself provide a loader until the data is completly fethced from the APIs.
You should wait until the loader is replaced with the pokemons

Once the pokeoms are loaded you can use the:

1. _**Search**_ by entering the name / Id / a Type of the pokemon. on Empty inputs you'll get have nothing on the screen. on Proper Inputs you'll have related matches.
> ℹ️ **Note:** you'll get a warn popup when performed search on site while loading and the input given will be cleared once the data is loaded.

2. _**Extra Details**_ on a click you can see more Details of the respective pokemon.

>ℹ️ **Note:** you've to click on the red button appears on the top rigth of `pokemon section`. The remaining elements will be diabled until the `pokemon section` is closed.

## Dependencies - APIs
we've used the following APIs to fetch the Pokémon's data
1. `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
is used to fetch the data of 1302 pokemons data in the form of `JSON`. 
2. `https://pokeapi.co/api/v2/type/` 
is used to determine the strengths and weakness of a particular type.

## Conclusion
This is our Pokémon World, you can refer the types and weakness of the pokemons when playing Pokémon games.