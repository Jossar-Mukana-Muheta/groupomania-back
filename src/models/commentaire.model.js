const Sequelize = require("sequelize");
const sequelize = require("../config/database/sequelize.connexion");

const Commentaire = sequelize.define(
  "commentaire", {
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publier: {
      type: Sequelize.STRING,
      allowNull: false,


    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    updatedAt: "updateTimestamp",
  }
);

module.exports = Commentaire;