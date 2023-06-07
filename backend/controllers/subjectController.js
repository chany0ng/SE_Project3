const express = require("express");
const model = require("../models");
const { Readable } = require('stream');


//과목에 해당하는 공지사항 리스트 주는 함수
exports.getNoticeList = async(req, res, next) => {
    let subjectId = req.params.id;
    let notices = await model.notices.findAll({
        where: {subject_id: subjectId},
        include: {model: model.professors}
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(400);     //Bad request
    });
    return res.status(200).send(notices);
};

//공지사항 작성 함수
exports.writeNotice = async(req, res, next) => {
    let filename = req.files[0].originalname;
    let filedata = req.files[0].buffer;
    let mimetype = req.files[0].mimetype;

    let datas = {
        file_name: filename,
        file_content: filedata,
        file_mimetype: mimetype
    }

    let result = await model.files.create(datas).catch((err) => console.log(err));
};

//다운로드 함수
exports.Download = async(req, res, next) => {
    let id = 1;
    let file = await model.files.findOne({where: {file_id: id}}).catch((err) => console.log(err));
    
    res.setHeader('Content-Type', file.file_mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${file.file_name}"`);
  
    // 파일을 스트림 형태로 응답한다.
    const fileStream = new Readable();
    fileStream.push(file.file_content);
    fileStream.push(null);
    fileStream.pipe(res);
    
};

//묻고 답하기 조회
exports.getQnAList = async(req, res, next)  => {
    let subjectId = req.params.id;
    let qnas = await model.QnAs.findAll({
        where: {subject_id: subjectId},
        include: {model: model.students}
    }).catch((err) => {
        console.log(err);
        return res.sendStatus(400);     //Bad request
    });
    return res.status(200).send(qnas);
}

//묻고 답하기 작성
exports.writeQnA = async(req, res, next) => {
    let studentId = req.session.loginId;
    let subjectId = req.params.id;
    let datas = {
        student_id: studentId,
        subject_id: subjectId,
        QnA_title: req.body.title,
        QnA_description: req.body.description,
        isDeleted: 0,
    }
    //묻고 답하기 작성
    let result = await model.QnAs.create(datas)
    .catch((err) => console.log(err));

    if (result.length !== 0) {
        //작성 성공
        let data = await model.QnAs.findAll({
            where: {student_id: studentId, subject_id: subjectId },
            include: {model: model.students}
        }).catch((err) => console.log(err));
        return res.status(200).send(data);
    } else {
        //작성 실패
        return res.sendStatus(400); //Bad request
    }
};