const express = require("express");
const model = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

//수강 신청 함수
/*
    브라우저에서 넘겨줄 정보: 학정번호, 그 과목 듣는 학년, 학기 
    아마 학년, 학기는 뭐 4학년 2학기던 수강 신청하는 학년, 학기로 통일하는게 나을 듯
    아마 시간 겹치는 지 비교해서 안된다고 뜨는건 수강 신청 4학년 2학기 시간표 이미 있는데 추가한다거나 이럴 때 필요할듯
    학생마다 다르게 할거면 학생이 몇학년인지 알게하는 정보가 필요할듯
    뭐 만약에 수강 신청한거 실시간으로 시간표에 띄우는거 할거라거나 수강 신청 했던 거 삭제도 할거면 말 ㄱ
*/
exports.enrollment = async (req, res, next) => {
  let subjectId = req.body.subjectNumber;
  let studentId = req.session.loginId;
  let year = req.body.year;
  let semester = req.body.semester;

  //신청한 과목 시간 가져오기
  let subject = await model.subjects
    .findOne({ where: { subject_id: subjectId } })
    .catch((err) => console.log(err));
  let subjectTime = subject.subject_time;

  //학생이 수강 중인 과목의 시간 정보 가져오기
  let enrollments = await model.enrollments
    .findAll({
      where: { student_id: studentId, year: year, semester: semester },
      include: model.subjects,
    })
    .catch((err) => console.log(err));

  //신청한 과목 시간과 기존의 시간표와 겹치는지 확인
  for (let enrollment of enrollments) {
    let enrollmentTime = enrollment.subject.subject_time;
    if (checkTime(enrollmentTime, subjectTime) === true) {
      //수강 신청 실패 (시간 겹침)
      return res.sendStatus(400);
    }
  }

  let datas = {
    subject_id: subjectId,
    student_id: studentId,
    year: year,
    semester: semester,
  };
  //수강 신청 성공
  let result = await model.enrollments
    .create(datas)
    .catch((err) => console.log(err));
  return res.sendStatus(200);
};
//수강 삭제 함수
/*
    브라우저에서 넘겨줄 정보: 과목번호
*/
exports.deleteEnrollment = async (req, res, next) => {
  let studentId = req.session.loginId;
  let subjectId = req.body.subjectNumber;
  let enrollment = await model.enrollments
    .findOne({ where: { student_id: studentId, subject_id: subjectId } })
    .catch((err) => console.log(err));

  let result = await model.enrollments
    .destroy({
      where: { enrollment_id: enrollment.enrollment_id },
    })
    .catch((err) => console.log(err));

  if (result.length !== 0) {
    //수강 삭제 성공
    res.sendStatus(200);
  } else {
    //수강 삭제 실패
    res.sendStatus(400);
  }
};
// 과목 검색 함수
// 브라우저에서 넘겨줄 정보: 검색 값 (searchData)
exports.searchSubject = async(req, res, next) => {
    let keyword = req.body.searchData;
    let result = await model.subjects.findAll({
      where: {
        subject_name: {
          [Op.like]: "%" + keyword + "%" }}}).catch((err) => console.log(err));
    
    if (result.length !== 0) {
        //검색 성공
        res.status(200).send(result);
    } else {
        //검색 실패
        res.sendStatus(404);    //not found
    }
};
//과목 목록 가져오는 함수
// 브라우저에서 넘겨줄 정보: 페이지 번호
exports.getSubjectList = async(req, res, next) => {
    let page = req.params.page;
    let perPage = 10;
    //이름 오름차순 정렬
    let result = await model.subjects.findAll({
      order: [['subject_name', 'ASC']],
      limit: perPage,
      offset: (page - 1) * perPage }).catch((err) => console.log(err));
    
    if(result.length !== 0) {
        //과목 가져오기 성공
        res.status(200).send(result);
    } else {
        //과목 가져오기 실패
        res.sendStatus(404);    //Not Found
    }
};

//수강 신청 시 겹치는 시간이 있는지 확인하는 함수
function checkTime(existingTime, newTime) {
    let existing_time = [];
    let new_time = [];
    let duplication = false;
    //ex) 월1,7,8/수2 => 월1,7,8  수2 로 /를 기준으로 split 하는 작업
    let split_existingTime = existingTime.split("/");
    let split_newTime = newTime.split("/");
    //기존 수강 시간 변환
    //ex) 월1,7,8 => 월1, 월7, 월8 로 변환하는 작업
    for (let i = 0; i < split_existingTime.length; i++) {
      let day = split_existingTime[i][0];
      for (let j = 0; j < split_existingTime[i].length; j++) {
        if (!isNaN(split_existingTime[i][j])) {
          //숫자인 경우
          existing_time.push(day + split_existingTime[i][j]);
        }
      }
    }
    //새롭게 신청한 수강 시간 변환
    //ex) 월1,7,8 => 월1, 월7, 월8 로 변환하는 작업
    for (let i = 0; i < split_newTime.length; i++) {
      let day = split_newTime[i][0];
      for (let j = 0; j < split_newTime[i].length; j++) {
        if (!isNaN(split_newTime[i][j])) {
          //숫자인 경우
          new_time.push(day + split_newTime[i][j]);
        }
      }
    }
    //수강 시간이 중복되는지 비교
    for (let i = 0; i < existing_time.length; i++) {
      if (new_time.includes(existing_time[i])) {
        //중복되는 경우
        duplication = true;
        break;
      }
    }

    return duplication;
}
