const UserModel = require("../../models/user.model");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

/**
 * @description Logger
 */
const loglevel = 1;

function logger(lvl, msg) {
  if (lvl === 1) {
    console.log(msg);
  }
}

class User {
  /**
   * @description register
   * @returns user
   */
  async register(data) {
    logger(loglevel, "register service called");
    const hashedPassword = bcrypt.hashSync(data.password, 8);
    try {
      const response = await UserModel.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        isAdmin: data.isAdmin
      });
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "error register service");
      logger(loglevel, err);
      return {
        success: false,
        error: err,
      };
    }
  }

  /**
   * @description Login
   * @returns user Token
   */
  async login(data) {
    logger(loglevel, "User login service called");
    try {
      const response = await UserModel.findOne({
        where: {
          email: data.email
        },
      });
      if (!response) {
        return {
          success: false,
          body: "Utilisateur non trouvé !"
        };
      }
      logger(loglevel, "la réponse est :")
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur User login service");
      logger(loglevel, err);
      return {
        success: false,
        error: err,
      };
    }
  }

  /**
   * @description UPDATE password
   * @returns
   */
  async change_password(data) {
    logger(loglevel, "change_password service called");
    try {
      const response = await UserModel.update({
        name: data.name
      }, {
        where: {
          uid: data.uid
        }
      });
      logger(loglevel, response);
      return {
        success: true,
        body: response.body
      };
    } catch (err) {
      logger(loglevel, "erreur change_password service");
      logger(loglevel, err);
      return {
        success: false,
        error: err,
      };
    }
  }

  /**
   * @description DELETE user
   * @returns
   */
  async delete_user(data) {
    logger(loglevel, "delete_user service called");
    try {
      const response = await UserModel.destroy({
        where: {
          uid: data.userId
        },
      });
      logger(loglevel, response);
      return {
        success: true,
        body: response
      };
    } catch (err) {
      logger(loglevel, "erreur service");
      logger(loglevel, err);
      return {
        success: false,
        error: err,
      };
    }
  }
}

module.exports = User;