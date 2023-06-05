const express = require("express");
const model = require("../models");


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
    //console.log(req.files);
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