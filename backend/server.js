const fastify = require("fastify")({ logger: true });
const puppeteer = require("puppeteer");
const bcrypt = require("bcrypt");
const { writeUserData, readUserData } = require("./utility/db/database");
require("dotenv").config();
const authenticate = `${process.env.PASSWORD_KEY}`;
const saltRounds = 10;

//Write to DB;
//writeUserData("test4", "test4");
//readUserData(name);
fastify.register(require("@fastify/cors"), {
  origin: "*",
});

fastify.register(require("@fastify/jwt"), {
  secret: process.env.JWT_SECRET,
});

fastify.get("/search", async (request, reply) => {
  let webpage = request.query.webpage;
  let element = request.query.element;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(webpage);
    if (element === "href") {
      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]"), (a) =>
          a.getAttribute("href")
        )
      );
      reply.send({ data: hrefs }).code(200);
      await browser.close();
    } else if (element === "img" || element === "img-src") {
      const imgs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img"), (img) => img.src)
      );
      reply.send({ data: imgs }).code(200);
      await browser.close();
    } else {
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
    }
  })();
});

fastify.post("/signup", (request, reply) => {
  const username = request.body.username;
  const password = request.body.password;
  bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
    writeUserData(username, hash);
    const jwtToken = fastify.jwt.sign({ username });
    reply.send({ token: jwtToken }).code(200);
  });
});

fastify.post("/protected", async (request, reply) => {
  const tokenCheck = request.body.token;
  fastify.jwt.verify(tokenCheck, (err, decoded) => {
    if (err) fastify.log.error(err);
    fastify.log.info(`Token verified. Foo is ${decoded}`);
  });
  reply.send({ user: true }).code(200);
});

fastify.post("/login", async (request, reply) => {
  const username = request.body.username;
  const password = request.body.password;
  const jwtToken = fastify.jwt.sign({ username });
  const hash = await readUserData(username);
  bcrypt.compare(password, hash.username, function (err, result) {
    if (result === false) {
      reply.send({ user: false }).code(400);
    } else {
      reply.send({ user: true, token: jwtToken }).code(200);
    }
  });
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
