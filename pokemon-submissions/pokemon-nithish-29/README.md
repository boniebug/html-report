# POKEMON APPLICATION
   A simple pokemon application about, details of different characters in **pokemon cartoon** with images.
* ## FEATURES
  1. Contains 1000+ pokemons.
  2. Search option on top to search for pokemons on application.
  3. **More option**, click on it displays more details about pokemon.
  4. We can see 14 pokmons on window without any scroll.

* ## POKEMON DETAILS
  1. **Name :** The name of the Pokemon.
  2. **ID :** A unique identifier for the Pokemon.
  3. **Images :** representations of the Pokemon.
  4. **Type :** Type of the Pokmeon (e.g., Water, Fire, Grass).
  5. **Weakness :** A list of types against which the Pokemon is weak.
  6. **Abilities :** Special skills.
  7. **Moves :**  The different attacks pokemon can use.
  8. **Statistics :** The numbers that represent strength and weekness of pokemon.
  
* ## DISPLAY FORMAT
    * **Name**
    * **ID**
    * **Images**
    * **Type**

    At the bottom of each Pokémon container, there is a "**More**" button. When clicked, it opens a popup that provides in-depth details about the selected Pokemon, weaknesses, abilities, moves, and statistics.

* ## API's
    We have used two API's to fetch pokemon data.
    
    First viste [pokemon's website](https://pokeapi.co/).

    One of the API contains the 1000+ pokemons data.
   ```js
    https://pokeapi.co/api/v2/pokemon/
    ```
    After fetching data form this API and converted data into Js-object, it contains name and url of each pokemon data. Next used name of pokemons to get data.
    ```js
    https://pokeapi.co/api/v2/pokemon/{name-of-pokemon}/
    ```
  Then we get details about every pokemon using thier names.
  >NOTE: Use catch to display error while fetching the API

## Conclusion
This application  provieds User friendly interface and get detailed information about every pokemon. Quick search of favorite pokemon in list. 