const express = require('express');
const userServices = require('../domain/services/user/service_user');
const { jwtMiddleware } = require('../domain/repositories/middleware/middleware_jwt');

const router = express.Router();

router.get('/job-list', jwtMiddleware, userServices.getJoblist);
router.get('/current-user', jwtMiddleware, userServices.getCurrentUser);

router.get('/prueba', userServices.pruebaPostgreSQL);


module.exports = router