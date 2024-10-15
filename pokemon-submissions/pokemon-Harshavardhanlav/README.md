## pokemon-assignment
### Intorduction

**Goal** :The goal of this website is to provide a comprehensive platform for users to explore detailed information about all Pokémon. Users will be able to browse a list of Pokémon and, upon clicking on a specific Pokémon, view its detailed information, including:
- Statistics: Base stats like HP, Attack, Defense, Speed, etc.
- Moves: The list of moves the Pokémon can learn.
- Weaknesses: The Pokémon’s type-based weaknesses and resistance

### Website Structure 
The website consists of a single page designed to display Pokémon data. The page includes the following elements:

1. **Loader**: When the website is first opened, a loader is displayed while the Pokémon data is being fetched from the API. Once all the Pokémon data is successfully loaded, the loader disappears, revealing the page content.

2. **Search Bar**: Located at the top of the page, this search bar allows users to filter Pokémon based on their properties or name. The filtering functionality is implemented using JavaScript, enabling users to quickly find specific Pokémon.

3. **Pokémon Data Display**: Below the search bar, the page dynamically displays all Pokémon, including their images and basic information. This data is fetched from an API, ensuring that the information remains up to date.

4. **Pokémon Details**: When a user clicks on a specific Pokémon, additional information is displayed, such as its statistics, moves, and weaknesses. This interaction provides users with a deeper insight into the selected Pokémon.



### Technologies Used

- **HTML**: For structuring content.
- **CSS**: For styling the website (like Pokémon-themed colors, fonts).
- **JavaScript**: To handle dynamic features like search and filters and displaying content.
- **API** : To fetch Pokémon data.

### Code Explanation 
1. **HTML**
-Basic Layout: The HTML file sets up the structure of the Pokémon Info page, linking the CSS for styling and JavaScript for functionality.

2. Header:Contains a heading with h2 tag and an image of a Pokéball (#ball).
Includes a search bar within a search-container for filtering Pokémon by name.
    ```html
    <div id="header">
      <h2>Pokémon Info</h2>
      <img id="ball" src="src/images/pokeball (2).png" alt="">
      <div class="search-container">
      <input type="text" class="search-input" placeholder="Search...">
    </div>

3. Loading Section: A loading animation (#loadingLogo) with an image (rectangle.gif) and text (Loading...), which is shown while the data is being fetched.
Pokémon Container: The main section (#pokemon-container) where Pokémon cards will be dynamically displayed once fetched from the API.
4. Detail Container: A hidden container (#detail-container) that will display additional Pokémon details when a specific Pokémon is selected.
5. The src/css/pokemon.css file handles the visual styling, while src/js/pokemon.js contains the JavaScript code to make the page interactive.

