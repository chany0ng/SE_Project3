const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

router.get('/', loginController.CheckLogin);


router.get('/enrollment', loginController.CheckLogin);
router.post('/enrollment', userController.enrollment);
router.post('/enrollment/delete', userController.deleteEnrollment);

router.get('/subject/announcement', loginController.CheckLogin);

router.get('/subject/qna', loginController.CheckLogin);

router.get('/subject/syllabus', loginController.CheckLogin);

router.get('/mypage/information', loginController.CheckLogin);
router.post('/mypage/information', userController.CheckPW);
router.post('/mypage/information/update', userController.updateUser);

module.exports = router;


