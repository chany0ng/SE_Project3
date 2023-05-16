const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
/* GET home page. */

router.get('/', loginController.getLoginPage);
router.post('/', loginController.Login);

router.get('/signup', signupController.getSignupPage);
router.post('/signup', signupController.Signup);
module.exports = router;