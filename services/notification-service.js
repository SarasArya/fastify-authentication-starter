module.exports = async function(fastify, opts, next) {
  const { Notification } = fastify.Models;

  fastify.post('/sendNotification', async function(req, reply) {});

  fastify.post('/markAsRead', async function(req, reply) {});

  next();
};

module.exports.autoPrefix = '/Notification';
