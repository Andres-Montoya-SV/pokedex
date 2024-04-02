const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const csurf = require('csurf');

const { ServerConfig } = require('./config');
const routes = require('./routes');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(csurf());

app.listen(ServerConfig.PORT, () => {
    console.log(`Server iniciado en el puerto: ${ServerConfig.PORT}`)
    console.log(`http://localhost:${ServerConfig.PORT}`)
});