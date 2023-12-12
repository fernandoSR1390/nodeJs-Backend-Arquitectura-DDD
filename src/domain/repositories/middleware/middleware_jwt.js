const jwtRepository = require('../repository_jwt');

const jwtMiddleware = async (req, res, next) => {
    // get token from headers object
    const token = req.get('Authorization');
    // check token
    if (!token) {
      return res.status(401).send('Token es inválido.');
    }
  
    jwtRepository.verifyJWTToken(token)
      .then(user => {
        // put user's information to req object
        req.user = user;
        // call next to finish this middleware function
        next();
      }).catch(err => {
      res.status(401).send(err);
    });
  }

  module.exports = {
    jwtMiddleware
}