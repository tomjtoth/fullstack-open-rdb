const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    });

    await queryInterface.createTable("sessions", {
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    });

    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
    await queryInterface.removeColumn("users", "disabled");
  },
};
