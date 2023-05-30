const express = require('express');
const model = require('../models');

//비밀번호 체크 함수
exports.CheckPW = async(req, res, next) => {
    let id = req.body.userNumber;
    let pw = req.body.password;
    //비밀번호 체크
    let pw_check = await model.students.findAll({ where: { student_id: id, pw:pw } }).catch((err) => console.log(err));
    if (pw_check.length !== 0) {        
        //비밀번호 일치
        res.sendStatus(200);
    } else {
        //비밀번호 불일치
        res.sendStatus(401);       //Unauthorized     
    }
};
//내 정보 수정 함수
/*
    브라우저에서 넘겨줄 정보: 학번, 비밀번호, 이메일, 전화번호
    학번은 변경사항은 아닌데 테이블에서 검색을 위해 넘겨줘야 함.
    변경되지 않은 정보는 기존의 정보를 넘겨주면 됨.
    비밀번호의 경우도 사용자가 변경하면 새 비밀번호, 하지 않으면 기존 비밀번호를 넘겨주면 됨.
*/
exports.updateUser = async(req, res, next) => {
    let id = req.body.userNumber;
    let datas = {
        pw: req.body.password,
        email: req.body.email,
        phone_number: req.body.phoneNumber
    };
    
    let result = await model.students.update(datas, {where: {student_id: id}}).catch((err) => console.log(err));
    if(result.length !== 0) {
        //수정 성공
        res.sendStatus(200);
    } else {
        //수정 실패
        res.sendStatus(400);        //Bad request
    }
};
//수강 신청 함수
/*
    브라우저에서 넘겨줄 정보: 학번, 학정번호, 그 과목 듣는 학년, 학기 
    아마 학년, 학기는 뭐 4학년 2학기던 수강 신청하는 학년, 학기로 통일하는게 나을 듯
    아마 시간 겹치는 지 비교해서 안된다고 뜨는건 수강 신청 4학년 2학기 시간표 이미 있는데 추가한다거나 이럴 때 필요할듯
    학생마다 다르게 할거면 학생이 몇학년인지 알게하는 정보가 필요할듯
    뭐 만약에 수강 신청한거 실시간으로 시간표에 띄우는거 할거라거나 수강 신청 했던 거 삭제도 할거면 말 ㄱ
*/
exports.enrollment = async(req, res, next) => {
    let subjectId = 'H020-4-0846-01';//req.body.subjectNumber;
    let studentId = '2018202033';//req.body.userNumber;
    let year = '4';//req.body.year;
    let semester = '2';//req.body.semester;
    
    //신청한 과목 시간 가져오기
    let subject = await model.subjects.findOne({where: {subject_id: subjectId}}).catch((err) => console.log(err));
    let subjectTime = subject.subject_time;
    
    //학생이 수강 중인 과목의 시간 정보 가져오기
     let enrollments = await model.enrollments.findAll({where : {student_id: studentId, year:year, semester:semester }
     ,include: model.subjects}).catch((err) => console.log(err));

    
    // for (let enrollment of enrollments) {
    // }
    
    // if(result.length !== 0) {
    //     //수강 신청 성공
    //     res.sendStatus(200);
    // } else {
    //     //수강 신청 실패
    //     res.sendStatus(400);
    // }
    res.send(enrollments);
};

//수강 신청 시 겹치는 시간이 있는지 확인하는 함수
function checkTime(existingTime, newTime) {
    let existing_time = [];
    let new_time = [];
    let duplication = false;
    //ex) 월1,7,8/수2 => 월1,7,8  수2 로 /를 기준으로 split 하는 작업
    let split_existingTime = existingTime.split('/');
    let split_newTime = newTime.split('/');
    //기존 수강 시간 변환
    //ex) 월1,7,8 => 월1, 월7, 월8 로 변환하는 작업
    for (let i = 0;i < split_existingTime.length; i++){
        let day = split_existingTime[i][0];
        for(let j = 0; j < split_existingTime[i].length; j ++) {
            if(!isNaN(split_existingTime[i][j])) {
                //숫자인 경우
                existing_time.push(day + split_existingTime[i][j]);
            }
        }
    }
    //새롭게 신청한 수강 시간 변환
    //ex) 월1,7,8 => 월1, 월7, 월8 로 변환하는 작업
    for (let i = 0;i < split_newTime.length; i++){
        let day = split_newTime[i][0];
        for(let j = 0; j < split_newTime[i].length; j ++) {
            if(!isNaN(split_newTime[i][j])) {
                //숫자인 경우
                new_time.push(day + split_newTime[i][j]);
            }
        }
    }
    //수강 시간이 중복되는지 비교
    for(let i = 0; i < existing_time.length; i++) {
        if(new_time.includes(existing_time[i])) {
            //중복되는 경우
            duplication = true;
            break;
        }
    }

    return duplication;
};