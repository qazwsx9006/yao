"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      class: { type: Sequelize.STRING, allowNull: true },
      number: { type: Sequelize.STRING, allowNull: true },
      team: { type: Sequelize.STRING, allowNull: true },
      teamNumber: { type: Sequelize.STRING, allowNull: true },
      checkPoint1: { type: Sequelize.TEXT, allowNull: true },
      checkPoint2: { type: Sequelize.TEXT, allowNull: true },
      checkPoint3: { type: Sequelize.TEXT, allowNull: true },
      checkPoint4: { type: Sequelize.TEXT, allowNull: true },
      checkPoint5: { type: Sequelize.TEXT, allowNull: true },
      checkPoint6: { type: Sequelize.TEXT, allowNull: true },
      checkPoint7: { type: Sequelize.TEXT, allowNull: true },
      checkPoint8: { type: Sequelize.TEXT, allowNull: true },
      checkPoint9: { type: Sequelize.TEXT, allowNull: true },
      checkPoint10: { type: Sequelize.TEXT, allowNull: true },
      checkPoint11: { type: Sequelize.TEXT, allowNull: true },
      checkPoint12: { type: Sequelize.TEXT, allowNull: true },
      checkPoint13: { type: Sequelize.TEXT, allowNull: true },
      checkPoint14: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
