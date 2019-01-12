const fp = require('fastify-plugin');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticate = function(fastify, opts, next) {
  fastify.decorate('authenticate', async function(request, reply) {
    try {
      const token = request.headers.authorization;
      const user = jwt.verify(token, JWT_SECRET);
      if (user) {
        request.user = user;
        next();
        return;
      } else {
        reply.unauthorized('Token invalid. Please Login to continue');
        return;
      }
    } catch (err) {
      reply.unauthorized(err.message);
    }
  });
  next();
};

module.exports = fp(authenticate);
