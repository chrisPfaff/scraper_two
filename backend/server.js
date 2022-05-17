const fastify = require("fastify")({ logger: true });

fastify.get("/hello", async (request, reply) => {
  return { hello: request.query };
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
