const mongoose = require('mongoose');

//Constructing the schema for a Pokemon's Weakness
const weaknessSchema = new mongoose.Schema({
    //The pokemon's first typing
    PriType: {
        type: String,
        required: "This field is required."
    },
    //The pokemon's second typing
    SecType: {
        type: String,
        required: "This field is required."
    },
    NormalDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    FightingDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    FlyingDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    PoisonDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    GroundDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    RockDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    BugDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    GhostDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    SteelDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    FireDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    WaterDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    GrassDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    ElectricDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    PsychicDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    IceDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    DragonDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    DarkDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
    FairyDmg: {
        type: mongoose.Schema.Types.Decimal128,
        required: "This field is required."
    },
});

module.exports = mongoose.model('Weakness', weaknessSchema);