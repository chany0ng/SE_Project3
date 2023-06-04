const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const myPageController = require('../controllers/myPageController');
const enrollmentController = require('../controllers/enrollmentController');
const noticeController = require('../controllers/noticeController');

router.get('/', loginController.CheckLogin);

router.get('/enrollment', loginController.CheckLogin);
router.get('/enrollment/:page', enrollmentController.getSubjectList);
router.post('/enrollment', enrollmentController.enrollment);
router.post('/enrollment/delete', enrollmentController.deleteEnrollment);
router.post('/enrollment/search', enrollmentController.searchSubject);

router.get('/subject/notice', loginController.CheckLogin);
router.get('/subject/notice/:id', noticeController.getNoticeList);

router.get('/subject/qna', loginController.CheckLogin);

router.get('/subject/syllabus', loginController.CheckLogin);

router.get('/mypage/information', loginController.CheckLogin);
router.post('/mypage/information', myPageController.CheckPW);
router.post('/mypage/information/update', myPageController.updateUser);

module.exports = router;


