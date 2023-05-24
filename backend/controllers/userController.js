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
        res.sendStatus(401);  //Unauthorized              
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
    }
    
    let result = await model.students.update(datas, {where: {student_id: id}}).catch((err) => console.log(err));
    if(result.length !== 0) {
        //수정 성공
        res.sendStatus(200);
    } else {
        //수정 실패
        res.sendStatus(400);    //Bad request
    }
};