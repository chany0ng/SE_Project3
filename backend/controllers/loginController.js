const express = require('express');
const model = require('../models');

//로그인 체크 함수
exports.CheckLogin = async(req, res, next) => {
    if(req.session.id) {        //로그인 상태
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);            //로그아웃 상태
    }
};
//로그인 함수
exports.Login = async(req, res, next) => {
    let id = req.body.userNumber;
    let pw = req.body.password;
    let type = req.body.userType;
    let user = '';

    if(type === 'student') {
      //학생인 경우
      user = await model.students.findAll({where: {student_id: id, pw:pw}}).catch((err) => console.log(err)); 
    } else if (type === 'professor') {
      //교수인 경우
      user = await model.professors.findAll({where: {professor_id: id, pw:pw}}).catch((err) => console.log(err)); 
    }

    if (user.length !== 0) {        //로그인 성공
      req.session.id = id;
      return res.status(200).send(user);
    } else {                        //로그인 실패
      return res.sendStatus(401);   //Unauthorized
    }
};
//로그아웃 함수
exports.Logout = async(req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        return res.sendStatus(401);         //Unauthorized
      } else {
        // 로그아웃 성공
        req.session = null;
        return res.sendStatus(200);
      }
    });
}
