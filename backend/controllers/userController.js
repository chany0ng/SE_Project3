const express = require('express');
const model = require('../models');

//비밀번호 체크 함수
exports.CheckPW = async(req, res, next) => {
    let id = req.body.userNumber;
    let pw = req.body.password;
    //비밀번호 체크
    pw_check = await model.students.findAll({ where: { student_id: id, pw:pw } }).catch((err) => console.log(err));
    if (pw_check.length !== 0) {        
        //비밀번호 일치
        res.sendStatus(200);
    } else {
        //비밀번호 불일치
        res.sendStatus(401);  //unauthorized              
    }
};

exports.updateUser = async(req, res, next) => {
    
};