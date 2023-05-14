"use strict";

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    class: { type: DataTypes.STRING, allowNull: true },
    number: { type: DataTypes.STRING, allowNull: true },
    team: { type: DataTypes.STRING, allowNull: true },
    teamNumber: { type: DataTypes.STRING, allowNull: true },
    checkPoint1: { type: DataTypes.TEXT, allowNull: true },
    checkPoint2: { type: DataTypes.TEXT, allowNull: true },
    checkPoint3: { type: DataTypes.TEXT, allowNull: true },
    checkPoint4: { type: DataTypes.TEXT, allowNull: true },
    checkPoint5: { type: DataTypes.TEXT, allowNull: true },
    checkPoint6: { type: DataTypes.TEXT, allowNull: true },
    checkPoint7: { type: DataTypes.TEXT, allowNull: true },
    checkPoint8: { type: DataTypes.TEXT, allowNull: true },
    checkPoint9: { type: DataTypes.TEXT, allowNull: true },
    checkPoint10: { type: DataTypes.TEXT, allowNull: true },
    checkPoint11: { type: DataTypes.TEXT, allowNull: true },
    checkPoint12: { type: DataTypes.TEXT, allowNull: true },
    checkPoint13: { type: DataTypes.TEXT, allowNull: true },
    checkPoint14: { type: DataTypes.TEXT, allowNull: true },
  });

  return Game;
};
