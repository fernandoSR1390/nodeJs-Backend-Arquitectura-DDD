const express = require('express')
const loginServices = require('../domain/services/login/service_login')

const router = express.Router();

router.post('/', loginServices.login);
//router.post('/refreshtoken', loginController.refreshToken);

module.exports = router