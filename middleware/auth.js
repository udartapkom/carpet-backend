const jwt = require('jsonwebtoken');
const { UnautorizedErr } = require('../errors/index');
const { ERR_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
console.log(authorization)
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedErr(ERR_MSG.UNAUTORIZED);
    console.log("tut");
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-secret');
  } catch (err) {
    throw new UnautorizedErr(ERR_MSG.UNAUTORIZED);
  }

  req.user = payload;
  next();

  return true;
};

module.exports = { auth };