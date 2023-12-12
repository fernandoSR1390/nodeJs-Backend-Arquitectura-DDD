const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const mockDB = require('./repository_data.mock');

const jwtSecretString = process.env.JWT_SECRET;

const getAccessToken = (payload) => {
  return jwt.sign({user: payload}, jwtSecretString, { expiresIn: '15min' });
}

const getRefreshToken = (payload) => {
  // get all user's refresh tokens from DB
  const userRefreshTokens = mockDB.tokens.filter(token => token.userId === payload.id);

  // check if there are 5 or more refresh tokens,
  // which have already been generated. In this case we should
  // remove all this refresh tokens and leave only new one for security reason
  if (userRefreshTokens.length >= 5) {
    mockDB.tokens = mockDB.tokens.filter(token => token.userId !== payload.id);
  }

  const refreshToken = jwt.sign({user: payload}, jwtSecretString, { expiresIn: '30d' });

  mockDB.tokens.push({
    id: uuidv4(),
    userId: payload.id,
    refreshToken
  });

  return refreshToken;
}

const verifyJWTToken = (token) => {
  return new Promise((resolve, reject) => {
    if (!token.startsWith('Bearer')) {
      // Reject if there is no Bearer in the token
      return reject('El token no es válido');
    }
    // Remove Bearer from string
    token = token.slice(7, token.length);

    jwt.verify(token, jwtSecretString, (err, decodedToken) => {
      if (err) {
        return reject(err.message);
      }

      // Check the decoded user
      if (!decodedToken || !decodedToken.user) {
        return reject('El token no es válido');
      }

      resolve(decodedToken.user);
    })
  });
}

const refreshToken = (token) => {
  // get decoded data
  const decodedToken = jwt.verify(token, jwtSecretString);
  // find the user in the user table
  const user = mockDB.users.find(user => user.id = decodedToken.user.id);

  if (!user) {
    throw new Error(`El acceso está prohibido`);
  }

  // get all user's refresh tokens from DB
  const allRefreshTokens = mockDB.tokens.filter(refreshToken => refreshToken.userId === user.id);

  if (!allRefreshTokens || !allRefreshTokens.length) {
    throw new Error(`There is no refresh token for the user with`);
  }

  const currentRefreshToken = allRefreshTokens.find(refreshToken => refreshToken.refreshToken === token);

  if (!currentRefreshToken) {
    throw new Error(`El token de actualización es incorrecto`);
  }
  // user's data for new tokens
  const payload = {
    id : user.id,
    email: user.email,
    username: user.username
  };
  // get new refresh and access token
  const newRefreshToken = getUpdatedRefreshToken(token, payload);
  const newAccessToken = getAccessToken(payload);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
}

const getUpdatedRefreshToken = (oldRefreshToken, payload) => {
  // create new refresh token
  const newRefreshToken = jwt.sign({user: payload}, jwtSecretString, { expiresIn: '30d' });
  // replace current refresh token with new one
  mockDB.tokens = mockDB.tokens.map(token => {
    if (token.refreshToken === oldRefreshToken) {
      return {
        ...token,
        refreshToken: newRefreshToken
      };
    }

    return token;
  });

  return newRefreshToken;
}

module.exports = {
  getAccessToken,
  getRefreshToken,
  verifyJWTToken,
  refreshToken
};