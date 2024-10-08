# ***pokemon-assignment***

> - The website takes some time to load the information about pokemons
>> - The search and readmore functionalities are not work until the all pokemons are rendered

  ---

- ## **This Documentation discribes how this webiste works**
  - ### **Initially this website loads Pokemon information, which takes some time**
  - ### **We have  *search* and *Read more* functionalities**
      1. **How the search functionality works :**
         1. In this search functionality we have selection list and search bar
         2. We have provided search by categorization option by using select options
         3. **Ex :** select *type* in select list by search type wise.
      2. **What is *Read more* functionality :**
         1.  Initially the website shows us the pokemon *name, id, image, types*.
         2.  When we click the the *Read more*, It shows other extra information.
  - #### **Used *API's* in this website :**
    1. ***[Pokemon](https://pokeapi.co/api/v2/pokemon/?limit=1302 'pokemon')*** This contains a list of pokemon names and pokemon information URL's
    2. ***[pokemon info](https://pokeapi.co/api/v2/pokemon/1/ 'bulbasaur information')*** In this URL we have pokemon information.
    3. ``` json
        {
            //Bulbasaur information structure
            "name": "bulbasaur",
            "id": 1,
            "sprites": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            },
            "types": [
                {
                    "type": {
                        "name": "grass",
                    }
                },
                {
                    "type": {
                        "name": "poison",
                    }
                }
            ],
            "height": 7,
            "weight": 69
        }
        ```
