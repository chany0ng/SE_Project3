const express = require('express');
const path = require('path');
const router = express.Router();
const loginController = require('../controllers/loginController');
const signupController = require('../controllers/signupController');
const findPWController = require('../controllers/findPWController');
/* GET home page. */

router.get('/', loginController.CheckLogin);
router.post('/', loginController.Login);

router.get('/signup', loginController.CheckLogin);
router.post('/signup', signupController.Signup);

router.get('/findpw', loginController.CheckLogin);
router.post('/findpw', findPWController.CheckId);
router.post('/findpw_process', findPWController.findPW);

module.exports = router;