const render = require("koa-ejs");
const path = require("path");
const config = require("@mingyu/lib/config");
const { getApp, startServer } = require("@mingyu/server");
const { initialMiddleware } = require("@mingyu/server/middleware");
const getRouters = require("./routes");

function bootstrap() {
  const { serverName, port } = config.webServer;
  const routers = getRouters();
  let app = getApp({
    static: "./public",
//    basicAuth: { name: "sanrio", pass: "oirnas" },
  });
  app = initialMiddleware(app, [...routers]);

  render(app, {
    root: path.join(__dirname, "view"),
    layout: "layout",
    viewExt: "html",
    cache: false,
    debug: false,
  });

  server = startServer(app, serverName, port);
  return { app, server };
}

module.exports = bootstrap();
