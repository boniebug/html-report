<!-- # Pokemon-Assignment -->
# Pokemon Webpage

This webpage is used to gather the information about the pokemon from the API.

# Table of Contents

- **Introduction**

    - **API's Used.**

    - **Languages Used.**

- **Content**
    - **Description.**

    - **Functionalities.**

    - **Representation.**

    - **Webpage Look.**

# INTRODUCTION :

- # API's Used

    - **This webpage depends on these API's :**

        - To get pokemon data click on the *[pokemon](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

            - To get each pokemon data click on the above link and select the url. Example: *[Bulabsaur](https://pokeapi.co/api/v2/pokemon/1/)* to get pokemon Bulabsaur details.

        - To get the types information click on the *[Type](https://pokeapi.co/api/v2/type/)*.

            - To get each pokemon data click on the above link and select the url. Example: *[Normal](https://pokeapi.co/api/v2/type/1/)* to get the Normal type details.

        - To get the abilites information click on the *[Ability](https://pokeapi.co/api/v2/ability/)*.

            - To get each pokemon data click on the above link and select the url. Example: *[Stench](https://pokeapi.co/api/v2/abilities/1/)* to get the Stench ability details.

        - To get the Move information click on the *[Move](https://pokeapi.co/api/v2/move/)*.

            - To get each pokemon data click on the above link and select the url. Example: *[Pound](https://pokeapi.co/api/v2/move/1/)* to get the Pound move details.

        - To get the Images click on the *[Image](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/)* (It will not work when you not specify the pokemon Id).

            - To get each pokemon Image with position click on the above link and select the url. Example: *[Bulabsaur](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png)* to get the Bulbasur pokemon front image.

- # Languages Used

    1. ***Basic HTML.***

    2. ***Basic CSS.***

    3. ***Basic JAVASCRIPT.***

# Content :

- # Description

    - **In this Webpage, There are over 1302 (one pokemon's data is not mentioned correctly) pokemons in the webpage including from Gen 1 to Gen 9 and there are Future and Past Paradox pokemons including the Regular, Mytical, Psuedo-Legeendary, Legendary, Ultra-Beasts and Regional Variants. Regional variants like Galarian, Hissuian, Alolan variants. Example: *like Hissuian Typlosion, Alolan Exeggutor, Galarian Articuno***.

- # Functionalities

    - # Search

      - This feature is used to search the pokemon by either name or id or type.

      > NOTE : *This feature only works when all data is completely loaded.*

    - # More Details

      - This feature is used to get the extra information of the pokemon.

      > NOTE : *This feature only works when all data is completely loaded.*

- # Representation

    - **Page Loaded** : When webpage is loaded Every pokemon is shown in the box like structure with five fields.

        - **Image** : In this field it shows the Pokemon Image from the *[Image](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/)* (It will not work when you not specify the pokemon Id).

        - **Name** : In this field it shows the Pokemon Name from the *[pokemon](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

        - **Id** : In this field it shows the Pokemon Id from the *[pokemon](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

        - **Type** : In this field it shows the Pokemon Type/Types from the *[Type](https://pokeapi.co/api/v2/type/)*.

        - **More Details** : In this field it shows a refernce to more details of a specific.

    - **More Details** : When we click on the more details reference of a specific pokemon and with first four fields and extra six moves.

        - **Moves** : In the field it shows all the specific Pokemon Moves from the *[Move](https://pokeapi.co/api/v2/move/)*.

        - **Abilities** : In the field it shows all the specific Pokemon Abilities from the *[Ability](https://pokeapi.co/api/v2/ability/)*.

        - **Stats** : In the field it shows all the specific Pokemon Stats from the *[Stat](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

        - **Height** : In the field it shows all the specific Pokemon Height from the *[Height](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

        - **Weight** : In the field it shows all the specific Pokemon Weight from the *[Weight](https://pokeapi.co/api/v2/pokemon/?limit=1302&offset=0)*.

        - **Weakness** : In the field it shows all the specific Pokemon Weakness from the *[Weakness](https://pokeapi.co/api/v2/type/)*.

        > NOTE : *This feature only works when all data is completely loaded. There is a small drawback when using this it doesn't shows the more data immediately, So please wait*.

- # Webpage Look

    - **Webpage Before Loading Pokemon.** :

    ![Webpage Load](./src/images/page%20loaded.png)
    
    - **Pokemon View** :
    
    ![Pokemon View](./src/images/Pokemon%20view.png)