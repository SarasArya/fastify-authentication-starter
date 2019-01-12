'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, opts, next) {
  // Place here your custom code!

  // Do not touch the following lines
  fastify.register(require('fastify-sensible'));

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  });

  // Load global decorators
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'decorators')
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, { prefix: '/api' })
  });

  // Make sure to call next when done
  next();
};
