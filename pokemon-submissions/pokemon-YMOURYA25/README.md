
# Poki Pokemon 

pokemon explorer which dispay the some features about pokemon 

## major aspects in pokipokemon

- **Loading Screen**:display loading message while fetching the pokemaon . 
- **Pokemon Display**: once all pokemons are fetch , pokemon date like image , name , id , type of 1300 pokemons is diplay with in a container.

- **Detail Section**: On clicking a Pokemon, users can access:
  - Image
  - Name
  - ID
  - Type
  - Abilities
  - Height 
  - Weight
  - Moves
  - Stats
  - Weaknesses

- **Search Functionality**: we can search Pokemon by all cataogiries like name, ID, or type.


## usage

1. **Loader**: wait untill all the pokemons are loaded .
2. **View Pokemon**: Scroll and view pokemon containers.
3. **Search**: Use the search bar to find Pokemon by selecting the search criteria all, name, ID, or type and typing in the search bar.
4. **Detailed view**: Click on a Pokemon container to see a detailed view of pokemon information.

## API Info

This website use the [PokeAPI](https://pokeapi.co/) to fetch Pokemon data.

1. **Pokemon List**: 
   - **URL**: `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
   - **Data used**: Basic details of all Pokemon name, URL 

2. **Individual Pokemon Data**:
   - **key points**: Each Pokemon's URL (e.g., `https://pokeapi.co/api/v2/pokemon/{id or name}`)  

   - **details used in this api with their references**
   <br>
   <br>


     | **Attribute**  | **Expressing**                                  | **Reference**                                    |
     |----------------|-------------------------------------------------|-------------------------------------------------|
     | **Name**       | Name of the Pokemon       | `pokemonData.name`                              |
     | **ID**         | ID of the Pokemon                               | `pokemonData.id`                                |
     | **Height**     | Height of the Pokemon                           | `pokemonData.height`                            |
     | **Weight**     | Weight of the Pokemon                           | `pokemonData.weight`                            |
     | **Types**      | Types of Pokemon like _grass, poison_          | `pokemonData.types[index].type.name`           |
     | **Abilities**  | Abilities like _overgrow, chlorophyll_         | `pokemonData.abilities[index].ability.name`    |
     | **Moves**      | Moves like _razor-wind, swords-dance, cut_     | `pokemonDa  moves[index].move.name`           |
     | **Stats**      | Stats like _hp, attack, defense, special-attack, special-defense, speed_ | `pokemonData.stats[index].base_stat` |
     | **Image**      | Image of the Pokemon  |`pokemonData.sprites`|

> **Note:** Here, _pokemonData_ is the index object in the API. The index indicates it is an array, which we access through the index.
        

3. **Weakness Data**:

   - **key points**: pokemon Weekness(e.g., `https://pokeapi.co/api/v2/type/{typeId or name}`) 

    - **Weakness:**  
      - **Expressing:** weaknesses of Pokemon it based on
      - **Reference:** `data.damage_relations` 

>**Note**: here _data_ is index object of this api.. index tells its an array we access it thorugh index



