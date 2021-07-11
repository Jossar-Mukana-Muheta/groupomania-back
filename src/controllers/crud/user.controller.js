const UserService = require("../../services/crud/user.services");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserServiceInstance = new UserService();

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
 * @description register
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function register(req, res) {
  logger(loglevel, "User register controller called");
  logger(loglevel, req.body);
  try {
    const resultat = await UserServiceInstance.register(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Error create user",
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
 * @description login
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function login(req, res) {
  logger(loglevel, "User login controller called");
  logger(loglevel, "payload: ");
  logger(loglevel, req.body);
  try {
    const resultat = await UserServiceInstance.login(req.body);
    if (resultat.success === false) {
      return res.status(401).json({
        message: resultat.body,
      });
    }
    logger(loglevel, "bcrypt called")
    bcrypt.compare(req.body.password, resultat.body.dataValues.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({
            error: 'Mot de passe incorrect !'
          });
        }
        return res.status(200).json({
          userId: {
            id: resultat.body.dataValues.uid,
            name: resultat.body.dataValues.name,
            email: resultat.body.dataValues.email,
            isAdmin: resultat.body.dataValues.isAdmin
          },
          token: jwt.sign({
              userId: resultat.body.dataValues.uid
            },
            'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h'
            }
          )
        });
      })
      .catch(error => res.status(500).json({
        error
      }))

  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * @description change_password
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function change_password(req, res) {
  logger(loglevel, "change_password controller called");
  logger(loglevel, req.body);
  try {
    const resultat = await UserServiceInstance.change_password(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur change_password",
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
 * @description delete user
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function delete_user(req, res) {
  logger(loglevel, "delete_user controller called");
  logger(loglevel, req.body);
  try {
    const resultat = await UserServiceInstance.delete_user(req.body);
    if (resultat.success === false) {
      return res.status(resultat.status).json({
        message: "Erreur delete_user",
        data: resultat.error,
        status: resultat.status,
      });
    }
    return res.send(resultat.body);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  register,
  login,
  change_password,
  delete_user,
};