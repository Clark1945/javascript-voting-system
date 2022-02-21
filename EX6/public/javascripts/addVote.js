if(!$.cookie('userID') || $.cookie('userID')=="null"){
    alert("請先登入會員。");
    location.href="/public/login.html";
}
var optionAry=[];

function pushOption(){
    if($('#option').val() != ''){
        optionAry.push($('#option').val());
        var optionLabel=`<li style="margin:10px">
        ${optionAry[optionAry.length-1]}
        <input type="button" class="del" value="刪除" />
        </li>`;
        $('#option-group').append(optionLabel);
        $('#option').val('');
    }
}

function addVote(){
    if($('#title').val()==null || $('#title').val()==''){
        alert('請輸入標題');
        return;
    }
    if(optionAry.length<2){
        alert('至少加入兩個以上選項');
        return;
    }
    var postdata={
        title:$('#title').val(),
        optionAry:optionAry,
        account:$.cookie('userID'),
        name: $.cookie('userName')
    };
    $.post("/vote/addVote",postdata,function(res){
        if(res.status==0){
            alert('建立投票項目成功');
            location.href='/public/vote.html';
        }
    });
}

$(document).on('click','.del',function(){
    var index=$(this).parent().index();
    optionAry.splice(index,1);
    $(this).parent().remove();
})