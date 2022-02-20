if(!$.cookie('userID') || $.cookie('userID')=="null"){
    alert("請先登入會員。");
    location.href="/public/login.html";
}
var optionAry=[];