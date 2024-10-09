
# **Pokemon-Assignment**

### will display the characters with their characteristics

## About Ui
**After opening -** 

 - Their is a loader to be displayed with the text of loading🔃.  
 - It will load until the pokemons are ready to display.  

 **Displaying images -** 

- Now the images will display with the basic details
    - Basic details  
      1. name  
      2. id
      3. type
      4. with image
- The images are shown like side by side.  
- To view the more details you have to click on it.  

**On clicking -**

- When you click on an pokemon it will display more details for the respected pokemon.  
- When it opens it will highlight the popup and decrease the opactiy of the background.  
- And the popup contains a close button  which will close the popup.

**Searching -**

- Search is useful to locate or see the pokemons that you want
- The search contains:  
 1.search bar  
 2.search button  
 3.search filter    
 4.close search button
    - by name or id  
    - by type  
- If the search is valid ✅it will display the content related to the search  
- If it is invalid or not found ❌ it will display a invalid details popup for 2seconds and again it load all the pokemons  

## About Code

**Api used -**
 - [Main API]('https://pokeapi.co/api/v2/pokemon?limit=1032&offset=0') 
 - [name or id SearchAPI]('https://pokeapi.co/api/v2/pokemon/)
 - [Type search API]('https://pokeapi.co/api/v2/type/)

**Api Chosen website -**
 
 - [poké API](https://pokeapi.co/?ref=public-apis)
- Retriving information from API :   
   -
   - Name
   - ID
   - Image URL
   - Types
   - Height
   - Weight
   - Abilities
   - Moves
   - Stats
   - Weaknesses 
- Dealing with API  

     - we have used ***fetch*** to fetch the API
     - Used ***then*** to deal with the responsed data
     - If is there any error we have used ***.catch*** to catch the error    

**Functions and their functionality-**
-
- ***window.onload*** : After loadding the window it will call the ***fetchPokemon()*** . 
- ***fetchPokemon()*** : It fetchs the API to load the information and store the required information and call ***displalyPokemon()*** by passing the information to it up to that it will shows the loader.  
- ***dispalyPokemon()*** : This function functionality is to take the required basic information and display it on the webPage.  
- ***fetchSearch()*** : this fucntion will be called when the search button is clicked.this will check that the search filter wheather it is *by type* **or** *by name or id*.  
- ***closeSearch()*** : This function will be awaoled when the close search button will be clicked and it again call the ***fetchPokemon()***.
- ***detailInView()*** : This fucntion will be awoked when you clicked the pokemon to view more Details it will take the input of that respective pokemons id and divContainer and it views the popup.  
- ***closeDetailer()*** : When we clicked the close button in the detailer this fucntion will be called.


   

  


 
 