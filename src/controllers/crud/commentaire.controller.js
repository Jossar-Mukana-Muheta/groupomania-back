const CommentaireService = require("../../services/crud/commentaire.services");

const CommentaireServiceInstance = new CommentaireService();

/**
 * Logger
 */
const loglevel = 1;

function logger(lvl, msg) {
  if (lvl === 1) {
    console.log(msg);
  }
}

/**
 * @description CREATE commentaire
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function create(req, res) {
  logger(loglevel, "create controller called");
  logger(loglevel, "payload : ")
  logger(loglevel, req.body);
  try {
    const resultat = await CommentaireServiceInstance.create(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Error create commentaire",
        data: resultat.error,
        status: resultat.status,
      });
    }
    return res.send(resultat.body);
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * @description READ all
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function readAll(req, res) {
  logger(loglevel, "readAll commentaire controller called");
  logger(loglevel, "payload : ")
  logger(loglevel, req.body);
  try {
    const resultat = await CommentaireServiceInstance.readAll(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur readAll commentaire",
        data: resultat.error,
        status: resultat.status,
      });
    }
    return res.send(resultat.body);
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * @description READ by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function read(req, res) {
  logger(loglevel, "read commentaire controller called");
  logger(loglevel, "payload : ")
  logger(loglevel, req.body);
  try {
    const resultat = await CommentaireServiceInstance.read(req);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur read commentaire",
        data: resultat.error,
        status: resultat.status,
      });
    } else if (resultat.body === null) {
      return res.status(404).json({
        message: "Pas de commentaire avec cet Id",
        data: resultat.error,
      });
    }
    return res.send(resultat.body);
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * @description READ by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function update(req, res) {
  logger(loglevel, "update commentaire controller called");
  logger(loglevel, "payload : ")
  logger(loglevel, req.body);
  try {
    const resultat = await CommentaireServiceInstance.update(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur update commentaire",
        data: resultat.error,
        status: resultat.status,
      });
    } else if (resultat.body == 0) {
      return res.status(404).json({
        message: "Pas de commentaire avec cet Id",
      });
    }
    return res.send("Mise à jour efféctué");
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * @description READ by Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function deleted(req, res) {
  logger(loglevel, "delete commentaire controller called");
  logger(loglevel, "payload : ")
  logger(loglevel, req.body);
  try {
    const resultat = await CommentaireServiceInstance.deleted(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur delete commentaire",
        data: resultat.error,
        status: resultat.status,
      });
    } else if (resultat.body == 0) {
      return res.status(404).json({
        message: "Pas de commentaire avec cet Id",
      });
    }
    return res.send("Suppression effectué");
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  create,
  readAll,
  read,
  update,
  deleted,
};