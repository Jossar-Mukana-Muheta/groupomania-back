const Sequelize = require("sequelize");
const sequelize = require("../config/database/sequelize.connexion");

const User = sequelize.define(
  "user", {
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.INTEGER,
      default: 0
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    updatedAt: "updateTimestamp",
  }
);

module.exports = User;