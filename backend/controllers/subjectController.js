const express = require("express");
const model = require("../models");
const { Readable } = require('stream');


//과목에 해당하는 공지사항 리스트 주는 함수
exports.getNoticeList = async(req, res, next) => {
    let subjectId = req.params.id;
    let notices = await model.notices.findAll({
        where: {subject_id: subjectId},
        include: model.professors
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

//공지사항 보여주는 함수
exports.getNotice = async(req, res, next) => {
    let noticeId = req.params.id;
    let notice = await model.notices.fineOne({where: {notice_id: noticeId}}).catch((err) => console.log(err));

    if(notice) {
        //공지사항 전송 성공
        return res.status(200).send(notice);
    } else {
        //공지사항 전송 실패 (Not Found)
        return res.sendStatus(404);
    }
};

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