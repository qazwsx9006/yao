// for sequelize cli
const config = require("./index");

module.exports = {
  [config.env]: config.databaseConfig,
};
