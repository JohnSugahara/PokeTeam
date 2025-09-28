const express = require('express');
const pokemonController = require('../controllers/pokemonController');
const router = express.Router();

router.get('/pokemon/:id', pokemonController.getPokemonById);

router.get('/randomteam', pokemonController.getRandomTeam);

module.exports = router;
