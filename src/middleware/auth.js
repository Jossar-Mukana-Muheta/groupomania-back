const jwt = require('jsonwebtoken');

/**
 * Logger
 */
const loglevel = 1;

function logger(lvl, msg) {
  if (lvl === 1) {
    console.log(msg);
  }
}

module.exports = (req, res, next) => {
  try {
    logger(loglevel, "auth middleware called ")
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = JSON.stringify(decodedToken.userId);
    logger(userId)
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
      console.log("invalid user")
    } else {
      console.log("auth ok")
      next();

    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};