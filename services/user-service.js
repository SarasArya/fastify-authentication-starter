const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = async function(fastify, opts, next) {
  const { User } = fastify.Models;

  fastify.post('/signup', async function(req, reply) {
    console.log(req.body);
    try {
      const { name, emailId, password } = req.body;
      console.log('EmailID ', emailId);
      const existingUser = await User.findOne({ emailId });
      console.log('ExistingUser ', existingUser);
      if (existingUser) {
        reply.notAcceptable(
          'Sorry. Either emailId already exist in our record'
        );
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        emailId,
        password: hashedPassword
      });
      console.log(user);

      // @TODO add email validation
      reply.send({ message: 'Successfully Created User' });
    } catch (err) {
      console.error(err);
    }
  });

  fastify.post('/login', async function(req, reply) {
    const { emailId, password } = req.body;
    const existingUser = await User.findOne({ emailId });
    console.log('Exisiting User ', existingUser);
    if (!existingUser) {
      reply.forbidden('User not found');
      return;
    }
    const passwordComparison = await existingUser.comparePassword(password);
    if (!passwordComparison) {
      reply.unauthorized('Passwords dont match');
      return;
    }
    const parsedUser = existingUser.toJSON();
    console.log(parsedUser);
    const token = jwt.sign(parsedUser, JWT_SECRET, {
      expiresIn: '24h'
    });
    reply.send({ token });
  });

  next();
};

module.exports.autoPrefix = '/Users';
