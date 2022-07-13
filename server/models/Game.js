const mongoose = require('mongoose');

//Constructing the schema for a Pokemon's Game
const gameSchema = new mongoose.Schema({
    image: {
        type: String,
        required: "This field is required."
    },
    //The name of the games together with an &(Sun&Moon)
    names: {
        type: String,
        required: "This field is required."
    },
    nameOne: {
        type: String,
        required: "This field is required."
    },
    nameTwo: {
        type: String,
        required: "This field is required."
    },
});

module.exports = mongoose.model('Game', gameSchema);