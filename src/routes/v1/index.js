const express = require('express');

const {
    InfoController,
    PokemonController
} = require('../../controllers');

const router = express.Router();

router.get("/info", InfoController.information);
router.get("/pokemon", PokemonController.pokemonByName);
router.get("/pokemons", PokemonController.getAllPokemons);
router.get("/pokemon-random", PokemonController.getRandomPokemon);
router.get("/evolutions", PokemonController.getEvolutions);

module.exports = router;