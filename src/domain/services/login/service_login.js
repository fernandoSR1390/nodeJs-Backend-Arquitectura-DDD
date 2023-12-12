const jwtRepository = require('../../repositories/repository_jwt');
const mockDB = require('../../repositories/repository_data.mock');

const login = async (req, res) => {
  try {
    const loginData = req.body;

    if (!loginData || !loginData.username || !loginData.password) {
      return res.status(400).send('Por favor introduce datos válidos!');
    }

    const user = mockDB.users.find(user => user.username === loginData.username);

    if (!user) {
      return res.status(400).send('Usuario o contraseña incorrectos!');
    }

    if (user && user.password !== loginData.password) {
      return res.status(400).send('Usuario o contraseña incorrectos!');
    }

    const payload = {
      id : user.id,
      email: user.email,
      username: user.username
    };

    const accessToken = jwtRepository.getAccessToken(payload);
    const refreshToken = jwtRepository.getRefreshToken(payload);

    res.send({
      user,
      accessToken,
      refreshToken
    });
  } catch (e) {
    console.log(e);
}
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(403).send('El acceso está prohibido');
  }

  try {
    const newTokens = jwtRepository.refreshToken(refreshToken, res);
    res.send(newTokens);
  } catch (err) {
    const message = (err && err.message) || err;
    res.status(403).send(message);
  }
};
  
module.exports = {
    login,
    refreshToken
}