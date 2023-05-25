const express = require('express');
const model = require('../models');

//회원가입 함수
exports.Signup = async(req, res, next) => {
    let id = req.body.userNumber;
    let check = await model.students.findAll({where: {student_id: id}}).catch((err) => console.log(err)); //학번 중복 체크

    if(check.length === 0) {                    //회원가입 성공
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

        let result = await model.students.create(datas).catch((err) => console.log(err));
        res.sendStatus(200);
    }
    else {                      //중복된 학번 -> 회원가입 실패
        res.send(400);          //Bad request 
    }
};
