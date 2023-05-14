const koaLogger = require("koa-logger");
const static = require("koa-static");
const auth = require("koa-basic-auth");
const { koaBody } = require("koa-body");
const router = require("./lib/router");
const joiValidate = require("./lib/joi-validate.js");
const { getRouter } = router;

function getApp(customOptions = {}) {
  const Koa = require("koa");
  const cors = require("@koa/cors");
  const app = new Koa();

  app.use(koaLogger());
  app.use(cors());
  app.use(koaBody());

  // basicAuth example: { name: 'username', pass: 'password' }
  if (customOptions.basicAuth) app.use(auth(customOptions.basicAuth));
  if (customOptions.static)
    app.use(static(customOptions.static, { maxage: 60 * 60 * 1000 }));

  const Router = getRouter();
  const router = Router();
  router.route(require("./routes/hello-world"));
  router.route(require("./routes/upload"));
  app.use(router.middleware());

  return app;
}

function startServer(app, serverName, port) {
  return app.listen(port, async () => {
    console.log(`${serverName} Server listening on port ${port}`);
  });
}

// const app = getApp({
//   static: "./public",
// });
// startServer(app, "dev", 3000);

module.exports = {
  getApp,
  startServer,
  router,
  joiValidate,
};
