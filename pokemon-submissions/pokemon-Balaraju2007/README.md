  # Pokemon Website

  ## Documentation

  - Basic structure of pokemon website
      1. Header part
      2. Body part
  - Features
      1. 1032 pokemons and with their data
      2. Search bar
      3. see more button 
  - POkemon API's
      1. <https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1032>
      2. <https://pokeapi.co/api/v2/pokemon/n/> 

1. ## Basic structure of pokemon website  

   #### 1. Header part : 

    - pokemon heading
     - Search bar for pokemons

    #### 2. Body part : 

    - It has 1032 pokemons 
    - And also has respectively their details like 
    pokemon name, id, type, etc.....      

2. ## Features :

    1. **1032 pokemons and with their data :** By default,  when we open pokemon website it displays 1032 pokemons with respective their data like name, id, image like that.
    When we saw this website we can can see 12 pokemons at a time 
    2. **Search bar :** In Search Bar, when we type the pokemon name or id or type of the pokemon. It show that particular matched pokemon. it placed at the header part.
    3. **see more button :** By default each pokemon has 4 common attributes such as image, name, id . So Using this button *`When we click on see more button it shows pokemon other information such as height, weight, type, statistics, moves like that and Again click on that it gets normal state`*

3. ## Pokemon API's : 

    They are:
    1. <https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1032> : 

       1. In the above URL . It has 2 attributes they are : offset, limit
          - *Offset: It means starting of the pokemon*
          - *Limit: It means ending 10of the pokemon*
       2. using this API, we can extract 1032 pokemons and it returns 1032 objects it has two main propertirs name, url 
          - *name : we can get name of the particular pokemon*
          - *URL : we can get more information like height, weight etc...
          Ex : <https://pokeapi.co/api/v2/pokemon/n/> where n = 1, 2, 3....*
    2. <https://pokeapi.co/api/v2/pokemon/n/> :

          using this API we can extract more information about each pokemon such as height, image, id, weight, statistics, moves, type,etc...


