const config = require("@mingyu/lib/config");
const { getApp, startServer } = require("@mingyu/server");
const { initialMiddleware } = require("@mingyu/server/middleware");
const getRouters = require("./routes");

function bootstrap() {
  const { serverName, port } = config.apiServer;
  const routers = getRouters();
  let app = getApp({
    static: "./public",
  });
  app = initialMiddleware(app, [...routers]);
  server = startServer(app, serverName, port);
  return { app, server };
}

module.exports = bootstrap();
