const fp = require('fastify-plugin');
const dotenv = require('dotenv');

function loadEnvVariables(fastify, opts, next) {
  dotenv.config();
  next();
}
module.exports = fp(loadEnvVariables);
