const express = require('express');
const model = require('../models');

//비밀번호 체크 함수
exports.CheckPW = async(req, res, next) => {
    let id = req.session.loginId;
    let pw = req.body.password;
    //비밀번호 체크
    let pw_check = await model.students.findAll({ where: { student_id: id, pw:pw } }).catch((err) => console.log(err));
    if (pw_check.length !== 0) {        
        //비밀번호 일치
        return res.sendStatus(200);
    } else {
        //비밀번호 불일치
        return res.sendStatus(401);       //Unauthorized     
    }
};

//내 정보 수정 함수
exports.updateUser = async(req, res, next) => {
    let id = req.session.loginId;
    let datas = {
        pw: req.body.password,
        email: req.body.email,
        phone_number: req.body.phoneNumber
    };
    
    let result = await model.students.update(datas, {where: {student_id: id}}).catch((err) => console.log(err));
    if(result.length !== 0) {
        //수정 성공
        return res.sendStatus(200);
    } else {
        //수정 실패
        return res.sendStatus(400);        //Bad request
    }
};