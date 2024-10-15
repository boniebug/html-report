# PokeHub

### Table of contents
 
 * [Introduction](#introduction)
 * [Features](#features)
 * [Resources used](#resources-used)
 * [Conclusion](#conclusion)

![Pokemons](./src/Images/all-pokemon.jpeg);

### Introduction

PokeHub provides a comprehensive collection of Pokemon information.  This resource is designed for enthusiasts looking to expand their knowledge of the Pokémon universe.

### Features

* Extensive Pokemon Data

  * This encompasses various pokemons, ranging from starter types like Bulbasaur, Charmander, and Squirtle, to legendary Pokemon like Mewtwo and Lugia.

  * Here you can get various pokemons along with their details
    | Details                   | Description                      |
    |---------------------------|----------------------------------|
    | Identification number(Id) | To uniquely identify the pokemon |
    | Types                     | Tells which type of pokemon (types include various classfication such as grass, fire, water, bug and psychic) |
    | Height | Height of the pokemon |
    | Weight | Weight of the pokemon |
    | Normal Abilities | Abilities that don't need any special event |
    | Hidden Abilities | Abilities that will be reveled only in special events like strong sunlight etc.. |
    | Moves | Tells what are the things that it can do |
    | Stats | It determines how a pokemon will perform in battle |
    | Weakness |It indicates which types of Pokémon it is vulnerable to|

  * We highlights the diversity of Pokemon types and includes several pokemons from multiple generations.

* Search Functionality
  
  * Users can search for specific Pokémon by name or type or id.

### Resources Used

  * **PokeAPI**
      
      1. **Description:** [PokeAPI](https://pokeapi.co/) is a RESTful API that provides a wealth of information about Pokemons, including their attributes, types, abilities, sprites.

      2. **Endpoint:** 
        
          * The endpoint used for retrieving all Available resources/Pokemons data is:

            ```
            https://pokeapi.co/api/v2/pokemon/
            ```

            >  **Data retrieved from above Endpoint:** 
            >
            >  * Paginated list of available resources/pokemons on that API and Total Available resources/pokemons.
            > * Example: 
            >
            >   ```json
            >     {
            >       "count": 1302,
            >       "results": [
            >         {
            >           "name": "bulbasaur",
            >           "url": "https://pokeapi.co/api/v2/pokemon/1/"
            >         }
            >       ]
            >     }
            >  ```

          * Every Pokemon has it's own endpoint containing it's own wealth of information, here is an example:

            ```
            https://pokeapi.co/api/v2/pokemon/id or name/
            ```

            >  **Data retrieved from above Endpoint:** 
            >   1. Pokemon names
            >   2. Indentification numbers(IDs)
            >   3. Types
            >   4. Sprites
            >   5. Abilities
            >   6. Moves
            >   7. Stats
            >   8. Height
            >   9. Weight

          *  The specific endpoint used for retrieving Pokemon weakness is 

              ```
              https://pokeapi.co/api/v2/move/id or name/
              ```

               >  **Data retrieved from above Endpoint:** 
               >   1. Pokemon weakness
  
### Conclusion

  The PokeHub is an essential tool for enthusiasts seeking to understand pokemon strengths and weaknesses. With a user-friendly interface and organized data, users can easily access the information.