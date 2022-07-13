const mongoose = require('mongoose');

//Constructing the schema for a Pokemon's Attack
const attackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required."
    },
    description: {
        type: String,
        required: "This field is required."
    },
    //Normal, Fighting, Flying, etc
    type: {
        type: String,
        required: "This field is required."
    },
    //Physical, Special, or Condition
    category: {
        type: String,
        required: "This field is required."
    },
    power: {
        type: Number,
        required: "This field is required."
    },
    accuracy: {
        type: Number,
        required: "This field is required."
    },
    pp: {
        type: Number,
        required: "This field is required."
    },
    //The rate at which an added effect may be applied
    effectRate: {
        type: Number,
        required: "This field is required."
    },
    //The TM number in the games Sun/Moon/Ultra Sun/Ultra Moon
    tmNumSMUSUM: {
        type: Number,
        required: "This field is required."
    },
    //The TM number in the games Let's Go Pikachu/Eevee
    tmNumLGPLGE: {
        type: Number,
        required: "This field is required."
    },
    //The TM number in the games Sworld and Shield
    tmNumSWSH: {
        type: Number,
        required: "This field is required."
    },
    //The TM number in the games Brilliant Diamond and Shining Pearl
    tmNumBDSP: {
        type: Number,
        required: "This field is required."
    },
    //The TR number in the games Sworld and Shield
    trNumSWSH: {
        type: Number,
        required: "This field is required."
    },
});

module.exports = mongoose.model('Attack', attackSchema);