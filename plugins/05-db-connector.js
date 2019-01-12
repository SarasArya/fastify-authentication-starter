const mongoose = require('mongoose');
const fp = require('fastify-plugin');

const { MONGODB_CONNECTION_STRING } = process.env;

async function dbConnector(fastify, opts, next) {
  try {
    // const autoIndex = !!(NODE_ENV !== 'production' || NODE_ENV !== 'staging');
    const connection = await mongoose.connect(
      MONGODB_CONNECTION_STRING,
      { autoIndex: false, useNewUrlParser: true }
    );
    fastify
      .decorate('mongoose', connection)
      .addHook('onClose', (fastifyContext, done) => {
        fastifyContext.mongo.db.close(done);
      });
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = fp(dbConnector);
