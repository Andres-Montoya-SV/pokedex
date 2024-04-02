const { StatusCodes } = require("http-status-codes");
const Ok = require("../helpers").Ok;
const Error = require("../helpers").Error;
const logger = require("../config/logger-config");

const information = async (req, res) => {
  try {
    logger.info("GET /info");
    return res.status(StatusCodes.OK).json(
      await Ok(
        {
          nombre: "Pokedex API",
          version: "1.0.0",
          descripcion: "API para obtener información de pokemones",
        },
        null,
        StatusCodes.OK
      )
    );
  } catch (error) {
    logger.info("Error en information: ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        await Error(
          "Error en el servidor",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
          error
        )
      );
  }
};

module.exports = {
  information,
};
