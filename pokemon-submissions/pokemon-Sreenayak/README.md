# pokemon-Gallery

Welcome to the Pokémon Gallery! This web application fetches and displays Pokémon data using the PokéAPI. Users can view basic Pokémon information and search for specific Pokémon by name, ID, or type.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Fetching Process](#fetching-process)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Displays a gallery of Pokémon with images, names, IDs, and types.
- Search functionality to filter Pokémon by name, ID, or type.
- Modal display with detailed information about each Pokémon, including height, weight, abilities, and weaknesses.

## Technologies Used

- HTML
- CSS
- JavaScript
- [PokéAPI](https://pokeapi.co/)

## How It Works

1. **HTML Structure**: The HTML file provides a basic layout for the application, including a header, search input, and a container for Pokémon data.
   
2. **JavaScript Logic**: The JavaScript file fetches data from the PokéAPI and handles the display of Pokémon. It also manages user interactions such as searching and viewing details.

## Fetching Process

The application fetches data from the PokéAPI using asynchronous requests. Here’s how it works:

1. **Fetching Pokémon**: 
   - The `fetchPokemons` function initiates a fetch request to retrieve data for the first 18 Pokémon.
   - It loops through Pokémon IDs from 1 to 18 and makes a GET request for each.
   - Upon a successful response, it converts the data to JSON and adds it to an array.

2. **Displaying Pokémon**: 
   - The `displayPokemon` function creates a visual representation of each Pokémon, including an image and basic details.
   - It also includes a button to view more details in a modal.

3. **Searching**: 
   - The application allows users to search for Pokémon by name, ID, or type. 
   - When the search button is clicked, it filters the displayed Pokémon based on the user's input.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd pokemon-gallery

# usage

- Enter a Pokémon name, ID, or type in the search bar and click the "search" button.
- Click on any Pokémon to view additional details in a modal.


# Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to create a pull request.

# License

```
  
Feel free to adjust any section or details to better fit your project!

```