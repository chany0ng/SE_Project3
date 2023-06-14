const express = require('express');
const router = express.Router();
const multer = require('multer');
const loginController = require('../controllers/loginController');
const myPageController = require('../controllers/myPageController');
const enrollmentController = require('../controllers/enrollmentController');
const subjectController = require('../controllers/subjectController');
const studyingController = require('../controllers/studyingController');

const upload = multer();

router.get('/', )

router.post('/subject/notice/write', upload.single('upload'), (req, res) => {subjectController.writeNotice(req, res)});

router.post('/subject/syllabus/:subject_id/write', subjectController.writeSyllabus);
router.post('/subject/syllabus/:syllabus_id/update', subjectController.updateSyllabus);