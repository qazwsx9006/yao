const Sequelize = require("sequelize");
const config = require("../config");
const { loadFolderAllFiles } = require("../util");
const { DataTypes } = Sequelize;

let models;

const getClient = () => {
  if (!models) {
    // https://sequelize.org/master/manual/dialect-specific-things.html
    // https://sequelize.org/v5/manual/dialects.html
    // TODO: 改 mariaDB ?
    const { database, username, password, host, port, dialect, pool } =
      config.databaseConfig;
    const sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect,
      // logging: false,
      dialectOptions: { connectTimeout: 60000 },
      pool,
    });

    sequelize.beforeConnect((config) => {
      console.log("Connecting");
    });
    sequelize.afterConnect((config) => {
      console.log("Connection has been established successfully.");
    });
    sequelize.beforeDisconnect((config) => {
      console.log("Disconnecting");
    });
    sequelize.afterConnect((config) => {
      console.log("Disconnected");
    });

    models = getModels({ sequelize, DataTypes });
    models.db = models.sequelize = sequelize;
    models.Sequelize = Sequelize;
  }
  return models;
};

const getModels = function ({ sequelize, DataTypes }) {
  let result = {};
  const models = loadFolderAllFiles(__dirname, {
    skip: /^(plugins|index)/,
  });
  for (const model of models) {
    const _model = model(sequelize, DataTypes);
    result[_model.name] = _model;
  }

  for (const model of Object.values(result)) {
    if (model.associate) model.associate(result);
  }
  return result;
};

module.exports = getClient();
