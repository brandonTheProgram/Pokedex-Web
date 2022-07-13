const mongoose = require('mongoose');

//Constructing the schema for a Pokemon's Region
const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required."
    },
    image: {
        type: String,
        required: "This field is required."
    },
    //The minimum pokedex number in the region
    min: {
        type: Number,
        required: "This field is required."
    },
    //The maximum pokedex number in the region
    max: {
        type: Number,
        required: "This field is required."
    }
});

module.exports = mongoose.model('Region', regionSchema);