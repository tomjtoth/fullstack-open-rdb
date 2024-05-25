const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class JunkTable extends Model {}

JunkTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
    blogRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog_list_junction",
    // I want this to be un-auto-pluralized
    freezeTableName: true,
  }
);

module.exports = JunkTable;
