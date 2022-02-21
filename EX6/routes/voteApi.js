var express=require('express');
var router=express.Router();

var voteModel=require('../models/voteModel');

router.post('/addVote',function(req,res){
    var optionAry=[];
    for(var i=0;i<req.body.optionAry;i++){
        var option={name:req.body.optionAry[i],account:[]};
        optionAry.push(option);
    }

    var newvote=new voteModel({
        account:req.body.account,
        name:req.body.name,
        title:req.body.title,
        option:optionAry,
        postdate:new Date()
    });
    newvote.save(function(err,data){
        if(err){
            res.json({'status':1,'msg':'error'});
        }
        else{
            res.json({'status':0,'msg':'success'});
        }
    });
});

router.get('/getVote',function(req,res){
    var account=(req.query.account!=undefined) ?
    req.query.account:"";
    var title=(req.query.title!=undefined)?
    req.query.title:"";

    voteModel.find({
        "account":account!=""?account:{$regex:'.*'},  //透過$regex使用正規表示法來查詢資料，此處表示不進行會員帳號的篩選
        "title":{$regex:'.*'+title+'.*'}//正規表示法，前後字元零至無限次，除換行符號外。

    },function(err,data){
        if(err){return console.log(err);}
        res.json(data);
    })
});

module.exports=router;