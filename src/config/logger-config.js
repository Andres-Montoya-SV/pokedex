const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp, error }) => {
    return `${timestamp} ${level}: ${message} ${error ? error.stack : ''}`;
});

const logger = createLogger({
    format: combine(timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), customFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "data.log" }),
    ]
});

module.exports = logger;