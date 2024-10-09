# pokemon-assignment
# **features**
### 1. fetching all pokemons from **API** and show the loader while fetching.

here we have pokemons **[POKEMON API](https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302 "pokemon api")** in this we have 1300 pokemon details.

#### pokemons details are 
+ name
+ type 
+ ID(of pokemon)
+ img
>**note:** we have more details but in 1st feature we have to display only these four details of pokemons.  

now let's come to code to fetch the pokemon details  
we have to display the pokemons from **[POKEMON API](https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302 "pokemon api")** using fetch.  
```
const url = "https://pokeapi.co/api/v2/pokemonoffset=0&limit=1302"
fetch(url)
  .then(response => response.json()) 
  .then(data => console.log(data)) 
```   
we accessed data from the pokemon api now we have to add the loader.  
**💡*while the pokemons are fetching then we have to display the loader***   
```
loading...
```   
### 2. add search to the pokemons website  
here we have to add the search to the pokemons API website.  
#### ways to works   
+ even we type the name of the pokemon.  
+ even we type the ID of the pokemon.  
+ even we type the type of the pokemon.
>**note :** even we type the one letter of the type,ID and name. it have to work.  

### 3. add more details about pokemons and weakness of the pokemons. 
here we have to access the all pokemons details and display it in the differnt container.  
#### remaining details
+ height
+ weight
+ moves 
+ abilities
+ statisitics  

**💡*while displaying the details in different container then the container will display like pop up and remaining pokemons details will not work. if we close the particular pokemon details then it works***   

### weakness
To weakness we have to use different way to fetch the API   
By accessing **[POKEMON API](https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302 "pokemon api")**   

In the API we have access the types of the pokemon in that damage relations. we have to access the double damaged from because the pokemons weakness where they are fully damaged to.
