const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

/**
 * App Routes
 */
router.get('/', pokemonController.homepage);
router.get('/regions', pokemonController.exploreRegions);
router.get('/region/:name', pokemonController.exploreRegion);
router.get('/games', pokemonController.exploreGames);
router.get('/game/:name', pokemonController.exploreGame);
router.get('/pokemon/:name', pokemonController.explorePokemon);
router.post('/search', pokemonController.searchPokemon);

module.exports = router;