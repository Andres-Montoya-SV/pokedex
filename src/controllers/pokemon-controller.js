const { StatusCodes } = require("http-status-codes");
const Ok = require("../helpers").Ok;
const Error = require("../helpers").Error;
const axios = require("axios");

axios.defaults.baseURL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonByName = async (req, res) => {
  try {
    let pokemon = req.query._;
    if (!pokemon) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          await Error(
            "Falta el parametro pokemon",
            null,
            StatusCodes.BAD_REQUEST
          )
        );
    }
    let response = await axios.get(`${pokemon}`);
    return res.status(StatusCodes.OK).json(
      await Ok(
        {
          name: response.data.name,
          abilities: response.data.abilities,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types,
          sprites: response.data.sprites,
          cries: response.data.cries,
          forms: response.data.forms,
          id: response.data.id,
          moves: response.data.moves,
          stats: response.data.stats,
          evolution: response.data.evolution_chain,
        },
        null,
        StatusCodes.OK
      )
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        await Error(
          "Error en el servidor",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.code
        )
      );
  }
};

const getAllPokemons = async (req, res) => {
  try {
    let response = await axios.get(`?limit=1000000`);
    let pokemonNames = response.data.results.map((pokemon) => {
      return pokemon.name;
    });
    return res.status(StatusCodes.OK).json(
      await Ok(
        {
          count: `${response.data.count} pokemons`,
        },
        {
          results: pokemonNames,
        },
        StatusCodes.OK
      )
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        await Error(
          "Error en el servidor",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.code
        )
      );
  }
};

async function getRandomPokemon(req, res) {
  try {
    let count = await axios.get(`?limit=1000000`);
    count = count.data.count;
    let random = Math.floor(Math.random() * count) + 1;
    let response = await axios.get(`/${random}`);
    return res.status(StatusCodes.OK).json(
      await Ok(
        {
          name: response.data.name,
        },
        {
          name: response.data.name,
          abilities: response.data.abilities,
          height: response.data.height,
          weight: response.data.weight,
          types: response.data.types,
          sprites: response.data.sprites,
          cries: response.data.cries,
          forms: response.data.forms,
          id: response.data.id,
          moves: response.data.moves,
          stats: response.data.stats,
        },
        StatusCodes.OK
      )
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        await Error(
          "Error en el servidor",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.code
        )
      );
  }
}

async function getEvolutions(req, res) {
  try {
    let pokemon = req.query._;
    if (!pokemon) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          await Error(
            "Falta el parametro pokemon",
            null,
            StatusCodes.BAD_REQUEST
          )
        );
    }
    let response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemon}`);
    return res.status(StatusCodes.OK).json(
      await Ok(
        response.data.chain,
        null,
        StatusCodes.OK
      )
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        await Error(
          error,
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.code
        )
      );
  }
}

module.exports = {
  pokemonByName,
  getAllPokemons,
  getRandomPokemon,
  getEvolutions,
};
