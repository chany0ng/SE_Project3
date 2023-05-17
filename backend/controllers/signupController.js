const express = require('express');
const model = require('../models');
const path = require('path');

exports.getSignupPage = async(req, res, next) =>{

    if(req.session.student_id) {
        res.send({login: true});
    }
    else {
        res.send({login: false});
    }
    //res.sendFile(path.join(__dirname, '../public/index.html'));
};

exports.Signup = async(req, res, next) => {
    let id = req.body.userNumber;
    let check = await model.student.findAll({where: {student_id: id}}).catch((err) => console.log(err)); //학번 중복 체크
    if(check.length !== 0) {
        let datas = {
            student_id: req.body.userNumber,
            pw: req.body.password,
            name: req.body.userName,
            email: req.body.email,
            birth: req.body.birth,
            major: req.body.major,
            pw_question: req.body.question,
            pw_answer: req.body.answer,
            phone_number: req.body.phoneNumber
        }

        let result = await model.student.create(datas).catch((err) => console.log(err));
        res.json({duplication: false});
    }
    else {
        res.json({duplication: true});
    }
};
