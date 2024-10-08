# Pokemon world documentation

## List Of Features :
  - view upto 15 pokemon at time in webpage.
  - user can view **name, id, type** of the any pokemon by  deafult.
  - You can view search bar on the top of the web page Search criteria **name, id, type**.

  >NOTE: To see the more information about the pokemon click on the pokemon for which you wanna see information

## API's Used :
  - used this [Pokemon site](https://pokeapi.co/) to know the All Pokemon API.

  - used this [Pokemon API](https://pokeapi.co/api/v2/pokemon?limit=13000&offset=0) to get 1300 pokemon.
 
 >NOTE: After Fetching the pokemons from the above pokmon link you will get an **JSON**   object. Parse that object you will get an object  with some key's. In results key you can find array of pokemon object in that. For more clarity You can refer the below example.
 
 **Example of the pokemons data object:**
```js
{
  count:1300,
  results:[{},{},{},......],
  ..
}
```
>NOTE: After taking pokemon form the result key you will get the an object with two keys which are **name and url**. Name key contains the name of the pokemon and url key contains an link for fetching the form details about pokemon such as imageSource, type, id and many other. You can see the below example for more calarity of pokemon object.
 
**example of the pokemon object taking by the pokemons object**.
```js
{
  name:"bulbasaur",
  url:"https://pokeapi.co/api/v2/pokemon/1/"
}
```

>NOTE: After Fetching and parsing the json object taken from the url provided by the pokemon object Url key. We get and object we a list of key like **name,type, moves, id and many other**. You can refer the below example of the object for more details.

**example pokemon data Fetched using url given by the above pokemon object.** 
```js
{
  id:1,
  name: bulbasaur,
  moves:[{},{}],
  sprites:{ back_defaule:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",...},
  abilities:[{},{},...]
  height:7,
  weight:69,
  stats:[{},{},...],..
}
```





  
