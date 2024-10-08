# Pokemon Assignment

## Features

- *Pokemon List* : Displays a list of Pokemon fetched from the PokeAPI.
- *Search Functionality* : Allows users to search for Pokémon by name, ID, or type. As you type in the search box, the list filters in real time.
- *Detailed View* : Clicking on a Pokemon card opens a popup with detailed information, including:
  - Pokemon name and ID
  - Types
  - Height and weight
  - Moves
  - Abilities
  - Base statistics
  - Weaknesses against other types
  
## How to Use

1. *Access the Website* : Open the webpage in a browser.
2. *Search for Pokémon* : Type in the search box to filter Pokemon by name, ID, or type.
3. *View Details* : Click the "More Details" button on any Pokemon card to see detailed information in a popup.
4. *Close Popup* : Click the "Close" button in the popup to return to the main list.

## API Documentation

### Pokemon API

- *Base URL*: [PokeAPI](https://pokeapi.co/api/v2/)
- *Endpoints Used*:
  - https://pokeapi.co/api/v2/pokemon?limit=1032: Fetches a list of Pokemon.
  - https://pokeapi.co/api/v2/pokemon/{id or name}: Retrieves detailed information about a specific Pokemon.
  - https://pokeapi.co/api/v2/type/{id or name}: Fetches type-related weaknesses and strengths.

### Data Consumed

1. *List of Pokemon*:
   - *Endpoint*: /pokemon?limit=1032
   - *Data*: Returns an array of Pokémon objects, each containing:
     - name: The name of the Pokemon
     - url: The endpoint to fetch detailed information

2. *Detailed Pokemon Information*:
   - *Data*: Includes:
     - id: Pokémon's unique identifier
     - sprites: Images of the Pokémon
     - types: Array of types (e.g., Water, Fire)
     - height: Height in decimetres
     - weight: Weight in hectograms
     - moves: List of available moves
     - abilities: List of abilities

3. *Type Weaknesses*:
   - *Data*: Contains damage relations to identify weaknesses and strengths against other types.

## Conclusion

This Pokemon website provides an interactive way to explore Pokemon data and learn about their characteristics.