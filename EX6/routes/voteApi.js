var express = require('express');
var router = express.Router();
//在最上方引入voteModel
var voteModel = require('../models/voteModel.js');

//新增投票功能
router.post('/addVote', function (req, res) {
    var optionAry = [];
    for (var i = 0; i < req.body.optionAry.length; i++) {
        var option = { name: req.body.optionAry[i], account: [] }
        optionAry.push(option);
    }

    var newvote = new voteModel({
        account: req.body.account,
        name: req.body.name,
        title: req.body.title,
        option: optionAry,
        postdate: new Date()
    });
    newvote.save(function (err, data) {
        if (err) {
            res.json({ "status": 1, "msg": "error" });
        }
        else {
            res.json({
                "status": 0, "msg": "success",
                "data": newvote
            });
        }
    });
});

//取得投票資料
router.get('/getVote', function (req, res) {

    var account = (req.query.account != undefined) ? req.query.account : "";
    var title = (req.query.title != undefined) ?
        req.query.title : "";

    voteModel.find({
        "account": account != "" ? account : { $regex: '.*' },
        "title": { $regex: '.*' + title + '.*' }
    }, function (err, data) {
        if (err) { return console.log(err) }
        res.json(data);
    })
});

router.get('/getVoteById', function(req,res){
    voteModel.find({_id:req.query._id}, function(err,data){
        if(data==undefined){
            res.json({'status':1,'msg':'查無此投票'});
        }
        else{
            if(err){
                res.json({'status':1,'msg':'error'});
                console.log('error');
            }else{
                res.json({'status':0,'msg':'success','data':data[0]});
            }
        }
    });
});


module.exports=router;