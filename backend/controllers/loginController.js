const express = require('express');
const model = require('../models');


exports.CheckLogin = async(req, res, next) => {
    
    if(req.session.student_id) {        //로그인 상태
        res.send({login: true});
    }
    else {
        res.send({login: false});       //로그아웃 상태
    }
};

exports.Login = async(req, res, next) => {
    let id = req.body.userNumber;
    let pw = req.body.password;
    let user = await model.students.findAll({where: {student_id: id, pw:pw}}).catch((err) => console.log(err));   

  if (user.length !== 0) {        //로그인 성공
    req.session.student_id = id;
    console.log(req.session);
    res.send({ user: user, result: true });
  } else {                        //로그인 실패
    res.send({ result: false });
  }
};
