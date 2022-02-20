var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ex6-3',{useNewUrlParser:true});

var voteSchema = new mongoose.Schema({
    name:String,
    account:String,
    title:String,
    option:Array,
    postdate:Date
});
voteSchema.set('collection','vote');
var model = mongoose.model("vote",voteSchema); //member 為模組名稱
module.exports = model;