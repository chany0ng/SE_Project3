const express = require("express");
const router = express.Router();
const multer = require("multer");
const loginController = require("../controllers/loginController");
const myPageController = require("../controllers/myPageController");
const enrollmentController = require("../controllers/enrollmentController");
const subjectController = require("../controllers/subjectController");
const studyingController = require("../controllers/studyingController");

const upload = multer();

router.get("/", loginController.CheckLogin);

router.get("/enrollment", loginController.CheckLogin);
router.get("/enrollment/:page/:keyword?", enrollmentController.getSubjectList);
router.post("/enrollment", enrollmentController.enrollment);
router.post("/enrollment/delete", enrollmentController.deleteEnrollment);

router.get("/subject/notice", loginController.CheckLogin);
router.get("/subject/notice/:id/:page", subjectController.getNoticeList);
router.get("/subject/notice_view/:id", subjectController.getNotice);
//router.post('/subject/notice/write', upload.single('upload'), (req, res) => {subjectController.writeNotice(req, res)});
router.get("/subject/download/:id", subjectController.Download);

router.get("/subject/qna", loginController.CheckLogin);
router.get("/subject/qna/:id/:page", subjectController.getQnAList);
router.post("/subject/qna/:id/write", subjectController.writeQnA);
router.post("/subject/qna/:id/update", subjectController.updateQnA);
router.post("/subject/qna/:id/delete", subjectController.deleteQnA);

router.get("/subject/syllabus", loginController.CheckLogin);
router.get("/subject/syllabus/:id", subjectController.getSyllabus);

router.get("/studying/assignment", loginController.CheckLogin);
router.get(
  "/studying/assignment/:subject_id/:page",
  studyingController.getAssignmentList
);
router.post(
  "/studying/assignment/:assign_id",
  upload.single("upload"),
  (req, res) => {
    studyingController.submitAssignment(req, res);
  }
);
router.post(
  "/studying/assignment/:submit_id/update",
  upload.single("upload"),
  (req, res) => {
    studyingController.updateAssignment(req, res);
  }
);
router.post(
  "/studying/assignment/:submit_id/delete",
  studyingController.deleteAssignment
);

router.get("/mypage/information", myPageController.getUserInfo);
router.post("/mypage/information", myPageController.CheckPW);
router.post("/mypage/information/update", myPageController.updateUser);

module.exports = router;
