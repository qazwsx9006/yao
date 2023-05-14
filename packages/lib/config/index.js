let projectConfig;

function getConfig() {
  //  overridden default config path by setting
  process.env.NODE_CONFIG_DIR = __dirname;
  const config = require("config");

  if (!projectConfig) {
    const env = process.env.NODE_ENV || "development";
    projectConfig = {
      ...config,
      env,
    };
  }

  return projectConfig;
}

module.exports = getConfig();
