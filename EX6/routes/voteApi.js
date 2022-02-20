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

module.exports=router;