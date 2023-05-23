const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.CheckLogin);

router.get('/application', loginController.CheckLogin);

router.get('/subject/announcement', loginController.CheckLogin);

router.get('/subject/qna', loginController.CheckLogin);

router.get('/subject/syllabus', loginController.CheckLogin);

module.exports = router;


