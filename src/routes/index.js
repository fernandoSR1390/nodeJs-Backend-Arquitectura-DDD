const express = require('express')
const router = express.Router()

const loginC = require('../controllers/login');
const userC = require('../controllers/user');
const hospitalC = require('../controllers/hospital');

router.use('/login', loginC);
router.use('/users', userC);
router.use('/hospital', hospitalC);

module.exports = router