// add jest require for testing the API

const axios = require("axios");

// add jest require for testing the API
const { Ok, Error } = require("../helpers");
const logger = require("../config/logger-config");
const { StatusCodes } = require("http-status-codes");
const pokemonController = require("../controllers/pokemon-controller");

jest.mock("axios");

describe("Pokemon Controller", () => {
  let req, res;
  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("pokemonByName should return a pokemon", async () => {
    req.query._ = "pikachu";
    const response = {
      data: {
        name: "pikachu",
        abilities: [],
        height: 4,
        weight: 60,
        types: [],
        sprites: {},
        cries: {},
        forms: [],
        id: 25,
        moves: [],
        stats: [],
        evolution_chain: {},
      },
    };
    axios.get.mockResolvedValue(response);

    await pokemonController.pokemonByName(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith(
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
  });

  test("pokemonByName should return a bad request", async () => {
    req.query._ = "";
    await pokemonController.pokemonByName(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      await Error("Falta el parametro pokemon", null, StatusCodes.BAD_REQUEST)
    );
  });

  test("pokemonByName should return an internal server error", async () => {
    req.query._ = "pikachu";
    axios.get.mockRejectedValue(new Error("Internal Server Error"));

    await pokemonController.pokemonByName(req, res);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith(
      await Error(
        "Error en el servidor",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      )
    );
  });
});
