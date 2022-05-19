const fastify = require("fastify")({ logger: true });
const puppeteer = require("puppeteer");

fastify.get("/hello", async (request, reply) => {
  let webpage = request.query.webpage;
  let element = request.query.element;
  console.log(webpage, element);
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(webpage);
    const elements = await page.$(element);
    const val = await page.evaluate((el) => el.innerText, elements);
    reply.send(val).code(200);
    await browser.close();
  })();
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
