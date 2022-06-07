const fp = require("fastify-plugin");
require("dotenv").config();

module.exports = fp(function (fastify, opts, done) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
  });
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  done();
});
