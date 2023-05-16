const express = require('express');
const model = require('../models');
const path = require('path');

exports.getLoginPage = async(req, res, next) => {
    
    if(req.session.student_id) {
        res.send({login: true});
    }
    else {
        res.send({login: false});
    }
};

exports.Login = async(req, res, next) => {
    let id = req.body.student_number;
    let pw = req.body.password;
    let user = await model.student.findAll({where: {student_id: id, pw:pw}}).catch((err) => console.log(err));   

  if (user.length !== 0) {
    console.log(result);
    req.session.student_id = id;
    res.json({ user: user, result: true });
  } else {
    res.json({ result: false });
  }
};
