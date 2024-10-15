# POKEMON APPLICATION
   A simple pokemon application about, details of different characters in **pokemon cartoon** with images.
* ## FEATURES
  1. **Pokemon Data:** Access information on over 1000 Pokemon.
  2. **Search Functionality:** Quickly find your favorite Pokemon using the search bar.
  3. **Detailed Information Access:** Each Pokemon comes with a **More** button for deeper insights.
  4. **User-Friendly Interface:** Display up to 14 Pokemon at once without scrolling for a smooth experience.

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
  The application processes the data from the main API, converting it to a JavaScript object and subsequently fetching detailed information for each Pokemon.
  >NOTE: Use catch to display error while fetching the API's

## Conclusion
This application  provieds User friendly interface and get detailed information about every pokemon. Quick search of favorite pokemon in list. 