const winston = require('winston');

const colorizer = winston.format.colorize();
// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    winston.format.simple(),
    winston.format.printf(msg => colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/index.log'
    })
  ]
});

module.exports = logger