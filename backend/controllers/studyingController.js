const express = require("express");
const model = require("../models");
const { Readable } = require('stream');


//과제 목록 조회 함수
exports.getAssignmentList = async(req, res, next) => {
    let subjectId = req.params.id;
    let page = req.params.page;
    let perPage = 10;
    //과제 마감 기한이 얼마 남지 않은 순서로 과제 목록 가져오기
    let assignments = await model.assign_register.findAll({
        where: {subject_id: subjectId},
        order: [["assign_due_date", "ASC"]],
        limit: perPage,
        offset: (page-1) * perPage,
        include: [{model: model.subjects}, {model: model.professors}]
    }).catch((err) => {
        console.log(err)
        return res.sendStatus(400);
    });
    //삭제되지 않은 과제 리스트만 조회
    let assignmentsList = assignments.filter((assignment) => assignment.isDeleted === 0);
    let count = assitnmentList.length;
    let data = [assignmentsList, count];

    return res.status(200).send(data);
};
//과제 제출 함수
exports.submitAssignment = async(req, res, next) => {

};