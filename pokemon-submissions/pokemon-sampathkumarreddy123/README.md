
 * # **Pokémon Universe Website Features**

 *  Welcome to the **Pokémon Universe** website! This documentation covers the core features of the site, how to use them, and detailed information about the APIs powering the Pokémon data.
 

 * ## **Website Features :**
  
 * ### 1. <u>**Search for Pokémon :**</u>
 
 *    - **Description :** Users can search for any Pokémon by name, type, or ID.
 *    - **How to Use :**
 *        - Enter the Pokémon's name (e.g., Pikachu), type (e.g., Fire), or ID (e.g., 25) in the search bar
            located at the top of the page.
 *        - The Pokémon list dynamically filters based on your input.

 * ### 2. <u>**Display of Pokémon List :**</u>

 *    - **Description :** A comprehensive list of over 1000 Pokémon is fetched from the server and displayed.
 *    - **How to Use :**
 *        - Scroll through the Pokémon displayed on the homepage.
 *        - Each card features a Pokémon image, name, ID, and type.
 *        - Clicking on a Pokémon card opens up detailed information about that Pokémon.
 
 * ### 3.<u> **Pokémon Detail View :**</u>

 *    - **Description :** Provides a detailed view of a selected Pokémon.
 *    - **What’s Included :**
 *        - Name : The Pokémon’s name.
 *        - ID : The unique identifier of the Pokémon.
 *        - Types : Displays all types (e.g., Grass, Fire).
 *        - Weight : Weight of the Pokémon (in hectograms).
 *        - Height : Height of the Pokémon (in decimeters).
 *        - Abilities : Lists the abilities (e.g., Overgrow, Chlorophyll).
 *        - Moves : Displays the top 5 moves.
 *        - Stats : Base stats such as HP and Attack.
 *        - Weaknesses : Highlights the weaknesses based on the Pokémon’s types.
 *    - **How to Use :**
 *  - Click on any Pokémon card to see a detailed view of its stats and information. 

 * ### 4. <u>**Close Button for Details View :**</u>

 *    - **Description :** Closes the detailed Pokémon view.
 *    - **How to Use :**
 *         After viewing the Pokémon’s details, click the "Close" button to return to the main list.
 
 * * ### 5.<u> **Loading Indicator :**</u>

 *    - **Description :** A loading message is displayed while Pokémon data is being fetched.
 *    - **How to Use :**
 *         This indicator appears automatically when the page is loaded and disappears once data is fully retrieved.

   ---

 * ## **Pokémon API Usage**                                                   :

 * The site uses several endpoints from the **PokéAPI** to retrieve data about Pokémon. Below are the details of the APIs and the data they provide : 
 
 * ### **1. <u>Pokémon List API</u> :**

 *    - **Endpoint :** <https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0>
 *    - **Purpose :** Fetches a list of all available Pokémon.
 *    - **Data Retrieved** :
 *        name : Pokémon's name.
 *        url : URL for fetching detailed data on each Pokémon.
 *    - **Usage :** This API is called when the website first loads to get the full list of Pokémon.

 * ### **2.<u> Pokémon Details API </u> :**
 
 *    - **Endpoint :** <https://pokeapi.co/api/v2/pokemon/{pokemon_id}>
 *    - **Purpose :** Fetches detailed data for a specific Pokémon.
 *    - **Data Retrieved :**
 *         id : Unique identifier of the Pokémon.
 *         name : Name of the Pokémon.
 *         types : Array representing the Pokémon’s types (e.g., Fire, Water).
 *         weight : Weight of the Pokémon in hectograms.
 *         height : Height of the Pokémon in decimeters.
 *         abilities : List of abilities the Pokémon has.
 *         moves : A list of moves (displays the top 5).
 *         stats : Array of base stats, such as HP and Attack.
 *         sprites : Image URLs including `sprites.other.home.front_default` for the official image.
 *    - **Usage :** This API is used when a Pokémon card is clicked to display detailed information.

 * ### **3.<u> Pokémon Type Details API </u> :**

 *    - **Endpoint :** <https://pokeapi.co/api/v2/type/{type_name}>
 *    - **Purpose :** Fetches details about each Pokémon’s type, including weaknesses.
 *    - **Data Retrieved :**
 *        damage_relations.double_damage_from: An array listing the types that deal double damage to this   
          Pokémon’s type.
 *    - **Usage :** This API is used to determine weaknesses and display them in the Pokémon's detailed view

   ---

 * ## **Website Interaction and Workflow :**
 
 * ### 1. **<u>Loading the Pokémon List</u> :**

 *    - When the website loads, the ***Pokémon List API*** is called to retrieve the list of all available 
        Pokémon.
 *    - While the data is being fetched, a loading indicator is displayed.
 *    - After data retrieval, the Pokémon list is rendered on the homepage, and the loading indicator is removed.

 * ### 2. **<u>Viewing Pokémon Details</u> :**

 *    - When a user clicks on a Pokémon card, the ***Pokémon Details API*** is called to fetch additional data 
        such as abilities, moves, stats, and weaknesses.
 *    - The detailed view of the Pokémon is then displayed on the page.

 * ### 3. **<u>Searching for Pokémon</u> :** 
  
 *    - As the user types in the search bar, the list of Pokémon filters dynamically based on the input (name, 
        type, or ID).
 *    - Matching Pokémon remain visible, while non-matches are hidden from the list.
 
 * ### 4. **<u>Closing the Detail View</u> :**

 *    - The detail view can be closed by clicking the "Close" button, which hides the Pokémon's details and  
        returns the user to the main list.
