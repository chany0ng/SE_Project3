const express = require("express");
const model = require("../models");
const { Readable } = require('stream');


//과제 목록 조회 함수
exports.getAssignmentList = async(req, res, next) => {
    let studentId = req.session.loginId;
    let subjectId = req.params.id;
    let page = req.params.page;
    let perPage = 10;
    //과제 마감 기한이 얼마 남지 않은 순서로 과제 목록 가져오기
    let assignments = await model.assign_register.findAll({
        where: {subject_id: subjectId},
        order: [["assign_due_date", "ASC"]],
        limit: perPage,
        offset: (page-1) * perPage,
        include: [{model: model.subjects}, {model: model.professors}, {model: model.files}]
    }).catch((err) => {
        console.log(err)
        return res.sendStatus(400);
    });
    //삭제되지 않은 과제 리스트만 조회
    let assignmentList = assignments.filter((assignment) => assignment.isDeleted === 0);
    let count = assignmentList.length;

    let assign_submit_List = [];
    //사용자의 과제 제출 여부 확인
    for (let assignment of assignmentList) {
        let registerId = assignment.register_id;
        submit = await model.assign_submit.findOne({
            where: {student_id: studentId, assign_id: registerId},
            include: {model: model.files}
        }).catch((err) => console.log(err));
        //과제 제출 여부가 포함된 새로운 배열 생성
        if(submit) {
            assign_submit_List.push({...assignment.get(), submit: submit.get()})
        } else {
            assign_submit_List.push(assignment.get());
        }
    }
  
    let data = [assign_submit_List, count];
    return res.status(200).send(data);
};

//과제 제출 함수
exports.submitAssignment = async(req, res, next) => {
    let assignId = req.params.id;
    let fileId = '';

    //업로드 파일이 있을 경우
    if(req.file) {
        let filedata = {
            file_name: req.file.originalname,
            file_content: req.file.buffer,
            file_mimetype: req.file.mimetype
        }

        let file = await model.files.create(filedata).catch((err) => {
            console.log(err)
            //파일 업로드 오류
            return res.sendStatus(400);
        });
        fileId = file.file_id;
    }

    let datas = {
        student_id: req.session.loginId,
        assign_id: assignId,
        submit_title: req.body.title,
        submit_description: req.body.description,
        submit_file: fileId === "" ? null : fileId
    }

    let result = await model.assign_submit.create(datas).catch((err) => {
        console.log(err);
        //과제 제출 등록 오류
        return res.sendStatus(400);
    })
    //과제 제출 성공
    return res.sendStatus(200);
};