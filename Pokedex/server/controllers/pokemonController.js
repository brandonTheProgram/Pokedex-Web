require('../models/database');
const Region = require('../models/Region');
const Game = require('../models/Game');
const Pokemon = require('../models/Pokemon');
const Attack = require('../models/Attack');
const Weakness = require('../models/Weakness');

//Set the restrictions for getting a pokemon icon
const pokemonProjection = {
    'basic.name': 1, 
    'basic.pokedexNumber': 1, 
    'basic.image': 1
};

//Set the restrictions for getting a pokemon evolution
const EvoProjection = {
    'locations': 0,
    'moveset': 0
}

const specialBrachEvosNums = [133, 265, 236];
const eeveelutions = [133, 134, 135, 136, 196, 197, 470, 471, 700];
const tyroguelutions = [236, 106, 107, 237];
const wurplelutions = [265, 266, 267, 268, 269];

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    try{
        const limitNumber = 5;
        
        const regions = await Region.find({}, {'name': 1, 'image': 1}).sort({_id:1}).limit(limitNumber).lean();
        const games = await Game.find({}, {'names': 1, 'image': 1}).sort({_id:1}).limit(limitNumber).lean();
        const latest = await Pokemon.find({}, pokemonProjection).sort({_id:-1}).limit(limitNumber).lean();

        //Get the min and max pokedex number of each region
        const Kanto = await Region.findOne({'name': 'Kanto'}, {'min': 1, 'max': 1}).lean();
        const Johto = await Region.findOne({'name': 'Johto'}, {'min': 1, 'max': 1}).lean();
        const Hoenn = await Region.findOne({'name': 'Hoenn'}, {'min': 1, 'max': 1}).lean();
        const Sinnoh = await Region.findOne({'name': 'Sinnoh'}, {'min': 1, 'max': 1}).lean();
        const Unova = await Region.findOne({'name': 'Unova'}, {'min': 1, 'max': 1}).lean();
        const Kalos = await Region.findOne({'name': 'Kalos'}, {'min': 1, 'max': 1}).lean();
        const Alola = await Region.findOne({'name': 'Alola'}, {'min': 1, 'max': 1}).lean();
        const Galar = await Region.findOne({'name': 'Galar'}, {'min': 1, 'max': 1}).lean();

        //Get a couple Pokemon from each region
        const kantoPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Kanto.min, $lte : Kanto.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const johtoPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Johto.min, $lte : Johto.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const hoennPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Hoenn.min, $lte : Hoenn.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const sinnohPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Sinnoh.min, $lte : Sinnoh.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const unovaPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Unova.min, $lte : Unova.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const kalosPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Kalos.min, $lte : Kalos.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const alolaPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Alola.min, $lte : Alola.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();
        const galarPokemon = await Pokemon.find({'basic.pokedexNumber': { $gte :  Galar.min, $lte : Galar.max}}, pokemonProjection).sort({_id:1}).limit(limitNumber).lean();

        const regionPokemon = {kantoPokemon, johtoPokemon, hoennPokemon, sinnohPokemon, unovaPokemon, kalosPokemon, alolaPokemon, galarPokemon};

        res.render('index', {title: 'Pokedex - Home', regions, games, latest, regionPokemon});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * GET /regions
 * Regions
 */
 exports.exploreRegions = async (req, res) => {
    try{
        const regions = await Region.find({}, {'name': 1, 'image': 1}).sort({_id:1}).lean();
        res.render('regions', {title: 'Pokedex - Regions', regions});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * GET /region/name
 * Region
 */
 exports.exploreRegion = async (req, res) => {
    try{
        let regionName = req.params.name;

        const region = await Region.findOne({'name': regionName}, {'min': 1, 'max': 1}).sort({_id:1}).lean();
        const pokemons = await Pokemon.find({'basic.pokedexNumber': { $gte : region.min, $lte : region.max}}, pokemonProjection).sort({_id:1}).lean();

        res.render('region', {title: ('Pokedex - ' + regionName), regionName, pokemons});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * GET /games
 * Games
 */
 exports.exploreGames = async (req, res) => {
    try{
        const games = await Game.find({}, {'names': 1, 'image': 1}).sort({_id:1}).lean();
        res.render('games', {title: 'Pokedex - Games', games});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * GET /game/name
 * Game
 */
 exports.exploreGame = async (req, res) => {
    try{
        let gamesName = req.params.name;

        const myArray = gamesName.split(" & ");
        const gameOne = myArray[0];
        const gameTwo = myArray[1];

        const pokemons = await Pokemon.find({
            $and: [
                {'locations': {$elemMatch: {'game': gameOne, 'isAvailable': 1}}},
                {'locations': {$elemMatch: {'game': gameTwo, 'isAvailable': 1}}}
            ]
        }, pokemonProjection).sort({_id:1}).lean();

        res.render('game', {title: ('Pokedex - ' + gamesName), gamesName, pokemons});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * Find and return pokemon with more than one branch evolution
 * @param  {Integer}   firstEvoNum   The pokedex number of the first Pokemon
 */
async function SpecialBranchEvo(firstEvoNum){
    var isEevee = false, isWurmple = false, isTyrogue = false;
    var specialBrachEvos = [];

    switch(firstEvoNum){
        case 133: isEevee = true; break;
        case 236: isTyrogue = true; break;
        case 265: isWurmple = true; break;
    }

    if(isEevee){
        for (const poke of eeveelutions){
            let temp = await Pokemon.findOne({'basic.pokedexNumber': poke}, EvoProjection).lean();
            specialBrachEvos.push(temp);
        }
    }
    else if(isWurmple){
        for (const poke of wurplelutions){
            let temp = await Pokemon.findOne({'basic.pokedexNumber': poke}, EvoProjection).lean();
            specialBrachEvos.push(temp);
        }
    }
    else if(isTyrogue){
        for (const poke of tyroguelutions){
            let temp = await Pokemon.findOne({'basic.pokedexNumber': poke}, EvoProjection).lean();
            specialBrachEvos.push(temp);
        }
    }

    var specialBranch = {specialBrachEvos, isEevee, isTyrogue, isWurmple};
    return specialBranch;
}

/**
 * Find and return the evolutionary line of the Pokemon
 * @param  {Object}   pokemon   The current pokemon that has been selected
 */
async function GetPokemonEvolutions(pokemon){
    var firstEvo = null, secondEvo = null, finalEvo = null, branchEvo = null;

    if(pokemon.evolutions.evolutions >= 0){
        // Get the first evolution
        firstEvo = await Pokemon.findOne({
            $and: [
                {'basic.pokedexNumber': pokemon.evolutions.firstEvoNum},
                {$and:[
                    {'basic.name': {$not: /Alolan/}},
                    {'basic.name': {$not: /Galarian/}}
                ]}
            ]
        }, EvoProjection).lean();
        // Get the final evolution
        if(pokemon.evolutions.evolutions >= 1){
            finalEvo = await Pokemon.findOne({
                $and: [
                    {'basic.pokedexNumber': firstEvo.evolutions.finalEvoNum},
                    {$and:[
                        {'basic.name': {$not: /Alolan/}},
                        {'basic.name': {$not: /Galarian/}}
                    ]}
                ]
            }, EvoProjection).lean();
        }
        // Get the second evolution
        if(pokemon.evolutions.evolutions == 2){
            secondEvo = await Pokemon.findOne({
                $and: [
                    {'basic.pokedexNumber': firstEvo.evolutions.secondEvoNum},
                    {$and:[
                        {'basic.name': {$not: /Alolan/}},
                        {'basic.name': {$not: /Galarian/}}
                    ]}
                ]
            }, EvoProjection).lean();
        }
        // Get Branch Evolution if so
        if(pokemon.evolutions.hasBranchEvo){
            branchEvo = await Pokemon.findOne({
                $and: [
                    {'basic.pokedexNumber': firstEvo.evolutions.branchEvoNum},
                    {$and:[
                        {'basic.name': {$not: /Alolan/}},
                        {'basic.name': {$not: /Galarian/}}
                    ]}
                ]
            }, EvoProjection).lean();
        }
    }
    const evos = {firstEvo, secondEvo, finalEvo, branchEvo};
    return evos;
}

/**
 * Find and return if the Pokemon has any Alolan Regional Forms
 * @param  {Object}   regionalForms   The object to store the regional forms
 * @param  {Object}   evos   The current evolutionary line of the Pokemon
 */
async function GetAlolanEvolutions(regionalForms, evos){
    var alolanFirstEvo = null, alolanSecondEvo = null, alolanFinalEvo = null, alolanBranchEvo = null;
    var alolanForms = false;

    if(evos.firstEvo != null && evos.firstEvo.basic.hasAlolanForm){
        let searchName = ("Alolan " + evos.firstEvo.basic.name);
        alolanFirstEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(evos.secondEvo != null && evos.secondEvo.basic.hasAlolanForm){
        let searchName = ("Alolan " + evos.secondEvo.basic.name);
        alolanSecondEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(evos.finalEvo != null && evos.finalEvo.basic.hasAlolanForm){
        let searchName = ("Alolan " + evos.finalEvo.basic.name);
        alolanFinalEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(evos.branchEvo != null && evos.branchEvo.basic.hasAlolanForm){
        let searchName = ("Alolan " + evos.branchEvo.basic.name);
        alolanBranchEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    //If the pokemon has only one alolan form, store the regular forms
    if(alolanFinalEvo != null && alolanSecondEvo == null && alolanFirstEvo == null){
        alolanFirstEvo = evos.firstEvo;
        alolanSecondEvo = evos.secondEvo;
    }

    //Check if any alolan forms were found
    if(alolanFinalEvo != null){
        alolanForms = true;
    }

    // Add the pokemon to the object
    regionalForms.alolanFirstEvo = alolanFirstEvo;
    regionalForms.alolanSecondEvo = alolanSecondEvo;
    regionalForms.alolanFinalEvo = alolanFinalEvo;
    regionalForms.alolanBranchEvo = alolanBranchEvo;
    regionalForms.alolanForms = alolanForms;
}

/**
 * Find and return if the Pokemon has any Galarian Regional Forms
 * @param  {Object}   regionalForms   The object to store the regional forms
 * @param  {Object}   evos   The current evolutionary line of the Pokemon
 */
async function GetGalarianEvolutions(regionalForms, evos){
    var galarianFirstEvo = null, galarianSecondEvo = null, galarianFinalEvo = null, galarianBranchEvo = null;
    var galarianForms = false;

    if(evos.firstEvo != null && evos.firstEvo.basic.hasGalarianForm){
        let searchName = ("Galarian " + evos.firstEvo.basic.name);
        galarianFirstEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(evos.secondEvo != null && evos.secondEvo.basic.hasGalarianForm){
        let searchName = ("Galarian " + evos.secondEvo.basic.name);
        galarianSecondEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(evos.finalEvo != null && evos.finalEvo.basic.hasGalarianForm){
        let searchName = ("Galarian " + evos.finalEvo.basic.name);
        galarianFinalEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
        //If the pokemon is not actually the final evolution, store it in the second and find the final
        if(galarianFinalEvo != null && galarianFinalEvo.evolutions.isSecondEvo){
            galarianSecondEvo = galarianFinalEvo;
            galarianFinalEvo = await Pokemon.findOne({'basic.pokedexNumber': galarianSecondEvo.evolutions.finalEvoNum}, EvoProjection).lean();
        }
    }
    // If the galarian second form has a normal evolution and not specifically a galarian form
    if(evos.finalEvo != null && galarianSecondEvo != null && galarianFinalEvo == null){
        galarianFinalEvo = await Pokemon.findOne({'basic.pokedexNumber': galarianSecondEvo.basic.pokedexNumber}, EvoProjection).lean();
    }
    // If galarian first form has a normal evolution and not specifically a galarian form
    else if(galarianFirstEvo != null && galarianFinalEvo == null && galarianSecondEvo == null){
        galarianFinalEvo = await Pokemon.findOne({'basic.pokedexNumber': galarianFirstEvo.evolutions.finalEvoNum}, EvoProjection).lean();
    }
    if(evos.branchEvo != null && evos.branchEvo.basic.hasGalarianForm){
        let searchName = ("Galarian " + evos.branchEvo.basic.name);
        galarianBranchEvo = await Pokemon.findOne({'basic.name': searchName}, EvoProjection).lean();
    }
    if(galarianSecondEvo != null && galarianFirstEvo == null){
        galarianFirstEvo = await Pokemon.findOne({'basic.pokedexNumber': galarianSecondEvo.evolutions.firstEvoNum}, EvoProjection).lean();
    }
    // If there is a glarain form of the final evo, but none others
    if(galarianFinalEvo != null && galarianFirstEvo == null && galarianSecondEvo == null){
        galarianFirstEvo = await Pokemon.findOne({'basic.pokedexNumber': galarianFinalEvo.evolutions.firstEvoNum}, EvoProjection).lean();
    }

    //Check if a galarian form was ever found
    if(galarianFirstEvo != null || galarianSecondEvo != null || regionalForms.galarianFinalEvo != null){
        galarianForms = true;
    }

    // Add the pokemon to the object
    regionalForms.galarianFirstEvo = galarianFirstEvo;
    regionalForms.galarianSecondEvo = galarianSecondEvo;
    regionalForms.galarianFinalEvo = galarianFinalEvo;
    regionalForms.galarianBranchEvo = galarianBranchEvo;
    regionalForms.galarianForms = galarianForms;
}

/**
 * Find and return the available moves for the Pokemon
 * @param  {Object}   pokemon   The current pokemon that has been selected
 */
async function GetPokemonMoves(pokemon){
    var attackList = [];

    for(const movesetObj of pokemon.moveset){
        let movesList = {
            game: "",
            levels: [],
            attacks: [],
            tmList: [],
            tmAttacks: [],
            trList: [],
            trAttacks: []
        };

        movesList.game = movesetObj.game;

        for(const move of movesetObj.moves){
            let temp = await Attack.findOne({'name': move.name}).lean();
            //Store the TM/TR
            if(move.level == 0){
                //Grab the TMs for Sun Moon Ultra Sun Ultra Moon
                if(movesList.game.includes("Sun")){
                    movesList.tmList.push(temp.tmNumSMUSUM)
                    movesList.tmAttacks.push(temp);
                }
                //Grab the TMs for Let's Go Pikachu Let's Go Eevee
                else if(movesList.game.includes("Pikachu")){
                    movesList.tmList.push(temp.tmNumLGPLGE)
                    movesList.tmAttacks.push(temp);
                }
                //Grab the TMs for Brilliant Diamond and Shinining Pearl
                else if(movesList.game.includes("Diamond")){
                    movesList.tmList.push(temp.tmNumBDSP)
                    movesList.tmAttacks.push(temp);
                }
                //Grab the TMs and Trs Sword and Shield
                else if(movesList.game.includes("Sword")){
                    //The move is a TM
                    if(temp.trNumSWSH == 0){
                        movesList.tmList.push(temp.tmNumSWSH - 1)
                        movesList.tmAttacks.push(temp);
                    }
                    //The move is a TR
                    else{
                        movesList.trList.push(temp.trNumSWSH - 1)
                        movesList.trAttacks.push(temp);
                    }
                }
            }
            else{
                movesList.levels.push(move.level);
                movesList.attacks.push(temp);
            }
        }
        attackList.push(movesList);
    }
    return attackList;
}

/**
 * GET /pokemon/name
 * Pokemon
 */
 exports.explorePokemon = async (req, res) => {
    try{
        // Declare the objects for the Pokmeon
        var evos, specialBranch, attackList;
        var regionalForms = {};

        //Get the name of the Pokemon previously clicked on
        let pokemonName = req.params.name;

        // Get the Pokemon
        const pokemon = await Pokemon.findOne({'basic.name': pokemonName}).lean();

        // Get the Pokemon's Weakness
        const weakness = await Weakness.findOne({'PriType': pokemon.basic.priType, 'SecType': pokemon.basic.secType}, {'PriType': 0, 'SecType': 0}).lean();

        // Get the special branch evolutions if available
        if(specialBrachEvosNums.includes(pokemon.evolutions.firstEvoNum)){
            specialBranch = await SpecialBranchEvo(pokemon.evolutions.firstEvoNum);
        }else{
            // Get the Pokemon's evolutions
            evos = await GetPokemonEvolutions(pokemon);

            //Get Alolan Forms
            await GetAlolanEvolutions(regionalForms, evos);

            //Get Galairan Forms
            await GetGalarianEvolutions(regionalForms, evos);
        }
        // Get Pokemon Moves
        attackList = await GetPokemonMoves(pokemon);
        
        res.render('pokemon', {title: ('Pokedex - ' + pokemonName), pokemon, weakness, evos, regionalForms, attackList, specialBranch});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
}

/**
 * POST /search
 * Search
 */
 exports.searchPokemon = async (req, res) => {
    try{
        let searchTerm = req.body.searchTerm;

        const pokemonName = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
        
        const pokemons = await Pokemon.find({"basic.name": new RegExp(pokemonName, 'i')}, pokemonProjection);

        res.render('search', {title: 'Pokedex - Search', pokemons});
    }
    catch(err){
        res.status(500).send({message: err.message || "ERROR OCCURED"});
    }
 }
