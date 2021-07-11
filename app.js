const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/config/database/sequelize.connexion");

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));
// parse application/json
app.use(bodyParser.json({
  limit: "50mb"
}));

// Routes
const commentaireRoutes = require("./src/routes/crud/commentaire.routes");
const userRoutes = require("./src/routes/crud/user.routes");

// Routes use
app.use(commentaireRoutes);
app.use(userRoutes);


// Création des table si n'existe pas dans la base de donné"
sequelize.sync();

module.exports = app;