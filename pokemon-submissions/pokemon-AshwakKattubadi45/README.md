# Pokemon Data Website Documentation

## Overview
This website allows users to search and view detailed information about Pokémon. The data is fetched from the Pokémon API and includes details such as name, image, ID, types, height, weight, abilities, stats, moves, and weaknesses.

---

## Features

### 1. **Search Functionality**
   - **Feature**: A search bar where users can search Pokémon by:
     - Name
     - ID
     - Type
   - **How To Use**: 
     - Type the Pokémon's name, ID, or type in the search input and press the "Search" button or wait for the results update automatically.

     - Example: Typing `fire` will show all fire-type Pokémon.

### 2. **Pokemon List**
   - **Feature**: A list that displays all Pokémon fetched from the API.
   - **Usage**:
     - Initially, the list shows all available Pokémon (up to 1010 Pokémon).
     - Each Pokémon is displayed with:
       - Name
       - Image
       - ID
       - Type
     - Click on any Pokémon to open a popup showing more detailed information.

### 3. **Pokemon Details Popup**
   - **Feature**: A modal popup that shows detailed Pokémon data when a Pokémon is clicked.
   - **Information Displayed**:
     - Name
     - Image
     - ID
     - Type
     - Height and Weight
     - Moves
     - Abilities
     - Stats
     - Weaknesses
   - **Usage**:
     - Click on a Pokémon in the list to open the popup.
     - The popup can be closed by clicking the "X" button in the top-right corner.

### 4. **Loader Animation**
   - **Feature**: A loader that is displayed while Pokémon data is being fetched from the API.
---

## Pokémon API Used

This website uses the public **Pokémon API** (`https://pokeapi.co`) to fetch Pokémon data.

### Endpoints Consumed

1. **Pokémon List API**:
   - **URL**: `https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}`
   - **Description**: This endpoint provides a list of Pokémon with their basic data (name, URL to fetch more details).

2. **Pokémon Details API**:
   - **URL**: Dynamic URLs for each Pokémon (e.g., `https://pokeapi.co/api/v2/pokemon/{id}`)
   - **Description**: This endpoint provides detailed data for each Pokémon.
   - **Data Consumed**:
     - `id`: Pokémon ID.
     - `name`: Name of the Pokémon.
     - `sprites.other.home.front_default`: URL for the Pokémon's image.
     - `types`: Pokémon types.
     - `height`: Height of the Pokémon.
     - `weight`: Weight of the Pokémon.
     - `abilities`: List of abilities.
     - `moves`: List of moves.
     - `stats`: Base stats
---
