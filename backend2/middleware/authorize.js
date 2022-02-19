const jwt = require ('jsonwebtoken');
require ('dotenv').config ();
const User = require ('../models/user.model');

module.exports = async (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status (400).json ({err: 'user need to login first'});
  }

  const token = authorization.replace ('Bearer ', '');

  jwt.verify (token, process.env.ACCESS_TOKEN, (err, payload) => {
    if (err) {
      return res.status (400).json ({err: 'user need to login first'});
    }
    console.log (payload);
    const {id} = payload;
    console.log (id, 'id');
    User.findById (id).then (userData => {
      req.user = userData;
      next ();
    });
  });
};
