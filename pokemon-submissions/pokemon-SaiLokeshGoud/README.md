# pokemon-assignment

## Overview

This Pokemon Search Website allows users to search and display Pokemon data, including names, types, images, and other statistics. It fetches data from the PokéAPI and provides an interactive user experience.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [File Structure](#file-structure)
4. [Usage](#usage)
5. [installation](#installation)
6. [Code Explanation](#code-explanation)

## Features

- Search for a Pokemon by name, ID, or type.
- Display detailed information about each Pokemon in a popup.
- Show loading animation while data is being fetched.
- Handle cases where no Pokemon is found.

## Technologies Used

- HTML
- CSS
- JavaScript
- [PokeAPI](https://pokeapi.co/)

## File Structure

```
/project-root
│
├── index.html
├── src
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── script.js
│   └── images
│       └── pokemon-logo-black-transparent.png
```

## Usage

1. Enter a Pokemon name, ID, or type in the search bar.
2. Click on a Pokemon card to view detailed information of a pokemon in a popup.
3. Wait untill the pokemons data is fetched.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-root
   ```
3. Open `index.html` in your preferred web browser.

## Code Explanation

### HTML Structure

The HTML structure consists of a header with a logo and a search bar, followed by a main section for displaying Pokemon data.

```html
<header id="header">
  <div id="pokemon-logo">
    <img src="src/images/pokemon-logo-black-transparent.png">
  </div>
  <div id="searchBarDiv">
    <input type="text" id="searchBar" placeholder="Search Pokemon...">
  </div>
</header>
<main id="main"></main>
``` 

### CSS Styles

The CSS file styles the page elements, including layout, colors, and animations.

- **General Styles**
  - Sets margin to `0` and uses a cursive font family.
  - Background color of `antiquewhite`.

- **Header Styles**
  - Sticky header with a brown background.
  - Logo height is set to `150px`.

- **Pokemon Card Styles**
  - Cards have a white background, rounded corners, and hover effects.

### JavaScript Functionality

The JavaScript file contains various functions to handle searching, fetching data, and displaying Pokemon details.

- **Main Functions**
  - `fetchPokemons()`: Fetches Pokemon data from the API.
  - `displayPokemons(pokemonResults)`: Displays the fetched Pokemon in the main section.
  - `filterPokemons(searchTerm)`: Filters Pokemon based on the search term.
  - `displayPokemonPopup(pokemonDetails)`: Displays detailed information about the selected Pokemon in a popup.

  - **Utility Functions**
  - `createElementWithClass(tag, className, textContent)`: Creates a new HTML element with a specified class and text.
  - `fetchPokemonWeaknesses(types)`: Fetches weaknesses for a Pokemon based on its types.
