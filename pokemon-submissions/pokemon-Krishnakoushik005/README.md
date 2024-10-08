# pokemon-assignment

> The Pokémon website shows 1,300 Pokémon, and each Pokémon has detailed information, including a search feature.

## Documention
- [PokeAPI](#pokeapi)
- [Website Overview](#website-overview)
- [Features in Website](#features-in-website)
## PokeAPI
> [Pokemon API](https://pokeapi.co/) site provides various Pokémon APIs.
>
> In this assignment, the API <https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0> is used to fetch Pokémons.
>
> After fetching the above API, we retrieve some Pokémon names and use their respective ***URLs*** to get detailed information about each Pokémon.

#### Eg:
```json
"results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },.....
]
```

## Website Overview
> Add a loader before rendering Pokémon because fetch is an **asynchronous operation**, and it takes time depending on the internet speed.
>
> In this website, the ***search feature*** allows users to find a particular Pokémon. Additionally, a loader should be displayed when the user interacts with the features, before rendering the Pokémon data.
>
> After loading all the Pokémons provided by the API, the loader is removed.
>
> By default, each Pokémon displays its name, image, ID, and type.
>
> When the user click on a Pokémon, a popup appears that shows all the details, such as height, weight, moves, abilities, stats, weaknesses, and also includes the previous details.

## Features in Website
+ **Pokémon Search Functionality**
    - Users can search for specific Pokémon by any details using the search feature.
    - User type any detail of a Pokémon, then click the Search button to find specific Pokémon.

+ **Detailed Pokémon Information**
  - By default, each Pokémon displays its name, image, ID, and type.
  - When the user click on a Pokémon, a popup appears that shows all the details, such as height, weight, moves, abilities, stats, weaknesses, and also includes the previous details.
