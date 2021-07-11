const commentaireModel = require("../../models/commentaire.model");

/**
 * @description Logger
 */
const loglevel = 1;

function logger(lvl, msg) {
  if (lvl === 1) {
    console.log(msg);
  }
}

class Commentaire {
  /**
   * @description CREATE
   * @returns commentaire
   */
  async create(data) {
    logger(loglevel, "create commentaire service called");

    var date = new Date();
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit"
    };
    let publication_date = date.toLocaleDateString("fr-FR", options);

    try {
      const response = await commentaireModel.create({
        title: data.title,
        content: data.content,
        userId: data.userId,
        userName: data.userName,
        publier: publication_date
      });
      logger(loglevel, "la réponse est :")
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "error create commentaire service");
      logger(loglevel, "l'erreur est :");
      logger(loglevel, err);
      return {
        success: false,
        error: err.response,
      };
    }
  }

  /**
   * @description READ all
   * @returns commentaires
   */
  async readAll() {
    logger(loglevel, "readAll commentaires service called");
    try {
      const response = await commentaireModel.findAll({});
      //logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur readAll commentaires service");
      logger(loglevel, err);
      return {
        success: false,
        error: err.response,
      };
    }
  }

  /**
   * @description READ by uid
   * @returns commentaire
   */
  async read(data) {
    logger(loglevel, "read commentaires service called");
    try {
      const response = await commentaireModel.findOne({
        where: {
          uid: data.params.id
        },
      });
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur read commentaires service");
      logger(loglevel, err);
      return {
        success: false,
        error: err.response,
      };
    }
  }

  /**
   * @description UPDATE by Id
   * @returns commentaire
   */
  async update(data) {
    logger(loglevel, "update commentaires service called");
    try {
      const response = await commentaireModel.update({
        title: data.title,
        content: data.content
      }, {
        where: {
          uid: data.uid
        },
      });

      logger(loglevel, "la réponse est :");
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur update commentaires service");
      logger(loglevel, err);
      return {
        success: false,
        error: err.response,
      };
    }
  }

  /**
   * @description DELETE one by Id
   * @returns commentaire
   */
  async deleted(data) {
    logger(loglevel, "delete commentaires service called");
    try {
      const response = await commentaireModel.destroy({
        where: {
          uid: data.uid
        },
      });
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur delete commentaire service");
      logger(loglevel, err);
      return {
        success: false,
        error: err.response,
      };
    }
  }

}

module.exports = Commentaire;