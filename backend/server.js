const fastify = require("fastify")({ logger: true });
const puppeteer = require("puppeteer");

fastify.get("/hello", async (request, reply) => {
  let params = request.query.webpage;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(params);
    await page.screenshot({ path: "example.png" });

    await browser.close();
  })();
  reply.code(200);
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
