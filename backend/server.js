const fastify = require("fastify")({ logger: true });
const puppeteer = require("puppeteer");

fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.get("/hello", async (request, reply) => {
  let webpage = request.query.webpage;
  let element = request.query.element;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(webpage);
    const elements = await page.$$(element);
    const results = [];
    for (let i = 0; i < elements.length; i++) {
      const htmlElement = elements[i];
      const textElement = await page.evaluate(
        (htmlElement) => htmlElement.textContent,
        htmlElement
      );
      results.push(textElement);
    }
    reply.send({ data: results }).code(200);
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
