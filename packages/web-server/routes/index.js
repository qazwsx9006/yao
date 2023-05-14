const { loadFolderAllFiles } = require("@mingyu/lib/util");
const { router } = require("@mingyu/server");

const getApiRouter = () => {
  const routes = loadFolderAllFiles(__dirname, {
    skip: /^(util|index|validate|admin|middleware)/,
  });

  return router.registerRoutes(routes);
};

module.exports = getApiRouter;
