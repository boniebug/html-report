# pokemon-assignment

# pokemon webpage Documentation 🃏

The pokemon webpage is a web based webpage that fetches data from the pokemon API and displays a list of pokemon with their details. The webpage uses JavaScript and HTML/CSS for the user interface.

## Functions

### fetchPokemonData()

- **What function doing:** Fetches the pokemon data from the pokemon API.
- **Parameters:** None

### fetchPokemonDetails(url)

- **What function doing:** Fetches the details of a pokemon from the pokemon API.
- **Parameters:**
	+ url: The URL of the pokemon API endpoint for the pokemon details.

### displayPokemonList(pokemonList)

- **What function doing:** Displays a list of pokemon with their details.
- **Parameters:**
	+ pokemonList: An array of pokemon objects.

### createPokemonElement(pokemon)

- **What function doing:** Creates an HTML element for a pokemon.
- **Return:** An HTML element showing the pokemon.
- **Parameters:**
	+ pokemon: A pokemon object.

### addPokemonDetails(pokemon, parentElement)

- **What function doing:** Adds the details of a pokemon to an HTML element.
- **Parameters:**
	+ pokemon: A pokemon object.
	+ parentElement: The HTML element that adds the pokemon object element
### main()

- **What function doing:** The main entry point of the webpage.
- **Parameters:** None

## pokemon Object

A pokemon object contains the following details details of pokemon:

* name: The name of the pokemon.
* id: The ID of the pokemon.
* sprites: Object containing the pokemon's sprites.
	+ other: Object containing the pokemon's other sprites.
* types: An array of objects containing the pokemon's types.
	+ type: An object containing the pokemon's type.
		- name: The name of the pokemon's type.

## Events

### click pokemon element

- **What function doing:** Open a popup with the pokemon's details when a pokemon element is clicked.
- **Function name:** displayPokemonPopup(pokemon)

## Error Handling 🚫

This webpage catches and print the any errors that occur during the execution of the fetchPokemonDetails function.