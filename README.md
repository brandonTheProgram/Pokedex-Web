# Pokedex-Web

https://user-images.githubusercontent.com/43584979/178660807-9dfb7af4-abb2-45f2-a5c5-5df71f397ba7.mp4

This is an update and improvement to the QtNationaldex project I have. This project is a website that will display all 898+ Pokemon’s data when a user clicks on the corresponding Pokemon. This program is capable of producing data for the regions starting with Kanto and ending with the current region of the current generation.

The information and images are © 2022 Pokémon. © 1995–2022 Nintendo/Creatures Inc./GAME FREAK inc. Pokémon, Pokémon character names, Nintendo Switch, Nintendo 3DS, Nintendo DS, Wii, Wii U, and WiiWare are trademarks of Nintendo. I do not own anything used in this program, just a fan project since I love Pokemon!

# Programming Facts

* The application uses [MongoDB Atlas](https://www.mongodb.com/atlas/database) as a backend cloud data store to store all data pertaining to Objects for the program.
* The application uses express for the backend portion.
* The application uses HTML, CSS, and JavaScript for the front end.

# To Use
## Web Server
* The program is hosted on Heroku/Render and can be accessed via the [link](https://pokedex-2yy7.onrender.com).
## Local Server
* In order to run Pokedex, you need to have [Node.js](https://nodejs.org/en/download/) installed on your machine.
* The project is best ran on Google Chrome and runs on port 3500 when downloaded. You change the port number on app.js.

# Application Screen Features

* Home
  * Gives the user the option to go to Game, Games, Region, Regions, Search, and Pokemon Screen.
  * ![Home Screen 1](https://user-images.githubusercontent.com/43584979/178662645-19558009-57fd-4a1e-9ba4-98740db7a1d2.png)
  * ![Home Screen 2](https://user-images.githubusercontent.com/43584979/178662653-2e53bf36-269a-4594-abde-7ba478820323.png)
* Game
  * See all available Pokemon in the given Pokemon game. For this example all Pokemon available in Pokemon Sun and Moon.
  * ![Game](https://user-images.githubusercontent.com/43584979/178664827-11b5b899-c16f-43cf-b610-285802ff4d7d.png)
* Games
  * See all the available Pokemon games that are present in the database.
  * ![Games](https://user-images.githubusercontent.com/43584979/178664880-b3475713-db7f-474d-92bb-6418f8795ee6.png)
* Region
  * See all available Pokemon in the given Pokemon region. For this example all Pokemon with Pokedex Numbers associated to Kanto.
  * ![Kanto Screen](https://user-images.githubusercontent.com/43584979/178662751-605bfed4-952f-43dd-a163-9c7de9822333.png)
* Regions
  * See all the available Pokemon regions that are present in the database.
  * ![Regions](https://user-images.githubusercontent.com/43584979/178665124-bff38d94-2333-454e-9afd-53b5591f89ec.png)
* Search
  * Display all Pokemon that match a name types in by the user. For this example, the user looked up Pikachu.
  * ![Search](https://user-images.githubusercontent.com/43584979/178665133-3c34ee29-211a-4daf-8bbc-913dacc47e05.png)
* Pokemon
  * Display all the Pokemon’s information on the screen.
  * ![Pikachu 1](https://user-images.githubusercontent.com/43584979/178662885-a481429a-b856-439a-ac36-b4faa970b283.png)
  * ![Pikachu 2](https://user-images.githubusercontent.com/43584979/178662895-93cd6672-9300-421c-918d-f9952a9557d1.png)
  * ![Pikachu 3](https://user-images.githubusercontent.com/43584979/178662899-d28272ea-7f8e-45a3-a72b-2faaaf4b2d1a.png)
  
# Pokemon Schema in MongoDB Atlas
```javascript
const mongoose = require('mongoose');

//Constructing the schema for a Pokemon's basic information
const basicSchema = new mongoose.Schema({
    pokedexNumber: {
        type: Number,
        required: "This field is required."
    },
    name: {
        type: String,
        required: "This field is required."
    },
    image: {
        type: String,
        required: "This field is required."
    },
    species: {
        type: String,
        required: "This field is required."
    },
    //The Pokémon’s primary typing
    priType: {
        type: String,
        required: "This field is required."
    },
    //The Pokémon’s secondary typing
    secType: {
        type: String,
        required: "This field is required."
    },
    description: {
        type: String,
        required: "This field is required."
    },
    //The amount of the Pokemon’s abilities
    abilities: {
        type: Number,
        required: "This field is required."
    },
    ability: {
        type: String,
        required: "This field is required."
    },
    abilityDesc: {
        type: String,
        required: "This field is required."
    },
    hiddenAbility: {
        type: String,
        required: "This field is required."
    },
    hiddenAbilityDesc: {
        type: String,
        required: "This field is required."
    },
    altAbility: {
        type: String,
        required: "This field is required."
    },
    altAbilityDesc: {
        type: String,
        required: "This field is required."
    },
    hasAlolanForm: {
        type: Boolean,
        required: "This field is required."
    },
    hasGalarianForm: {
        type: Boolean,
        required: "This field is required."
    }
});

//Constructing the schema for a Pokemon's evolutionary information
const evolutionsSchema = new mongoose.Schema({
    //The amount of evolutions the pokemon has
    evolutions: {
        type: Number,
        required: "This field is required."
    },
    isSecondEvo: {
        type: Boolean,
        required: "This field is required."
    },
    isFinalEvo: {
        type: Boolean,
        required: "This field is required."
    },
    hasBranchEvo: {
        type: Boolean,
        required: "This field is required."
    },
    evoThroughLvl: {
        type: Boolean,
        required: "This field is required."
    },
    evoThroughCond: {
        type: Boolean,
        required: "This field is required."
    },
    evoLevel:{
        type: Number,
        required: "This field is required."
    },
    secondEvoCond: {
        type: String,
        required: "This field is required."
    },
    finalEvoCond: {
        type: String,
        required: "This field is required."
    },
    firstEvoNum: {
        type: Number,
        required: "This field is required."
    },
    secondEvoNum: {
        type: Number,
        required: "This field is required."
    },
    finalEvoNum: {
        type: Number,
        required: "This field is required."
    },
    branchEvoNum: {
        type: Number,
        required: "This field is required."
    }
});

//Constructing the schema for a Pokemon's location information
const locationsSchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
        required: "This field is required."
    },
    game: { 
        type: String, 
        required: "This field is required."
    },
    location: {
        type: String, 
        required: "This field is required."
    }
});

//Constructing the schema for a Pokemon's move information
const moveSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    }
});

//Constructing the schema for a Pokemon's moveset information
const movesetSchema = new mongoose.Schema({
    game: {
        type: String,
        required: "This field is required."
    },
    moves: [
        moveSchema
    ]
});

//Constructing the schema for a Pokemon using the previous schemas
const PokemonSchema = new mongoose.Schema({
    basic: {
        type: basicSchema,
        required: "This field is required."
    },
    evolutions: {
        type: evolutionsSchema,
        required: "This field is required."
    },
    locations: [
        locationsSchema
    ],
    moveset: [
        movesetSchema
    ]
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
```
