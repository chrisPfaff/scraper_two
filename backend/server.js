const fastify = require("fastify")({ logger: true });
const puppeteer = require("puppeteer");

fastify.get("/hello", async (request, reply) => {
  console.log("request", request.query);

  // (async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   console.log(request.query);
  //   await page.goto(request.query);
  //   await page.screenshot({ path: "example.png" });

  //   await browser.close();
  // })();
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
