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
    //The pokemon's first typing
    priType: {
        type: String,
        required: "This field is required."
    },
    //The pokemon's second typing
    secType: {
        type: String,
        required: "This field is required."
    },
    description: {
        type: String,
        required: "This field is required."
    },
    //The amount of the pokemon's abilities
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