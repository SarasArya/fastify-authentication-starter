const fp = require('fastify-plugin');
const fs = require('fs');
const path = require('path');
const util = require('../utils/beautify-filename');

const location = path.join(__dirname, '../db-schema');

const ModelLoader = (fastify, opts, next) => {
  const Models = {};
  // fs.readdir takes a folder and returns a list of files without .. and .
  fs.readdir(location, (err, files) => {
    if (err) {
      next(err);
    }
    if (!files || files.length == 0) {
      next();
    }
    files.forEach(file => {
      // convert to a Model friendly file name
      const ModelName = util.beautifiedFileName(file);
      const Model = require(`${location}/${file}`);
      Models[ModelName] = fastify.mongoose.model(ModelName, Model);
    });
  });

  fastify.decorate('Models', Models);
  next();
};

module.exports = fp(ModelLoader);
