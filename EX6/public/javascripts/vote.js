function newVote(data){
    var content=document.createElement('tr');
    content.className='row100 body';

    var date=new Date(data.postdate);
    var crt_date=(date.getMonth()+1)+'/'+
    date.getDay()+' '+
    (date.getHours()<10 ? '0'+
    date.getHours() : date.getHours())+
    ':'+(date.getMinutes()<10 ?
    '0'+date.getMinutes() : date.getMinutes());

    var addHtml=`<td class="cell100 colummn1"></td>
    <td class="cell100 column2">
    <a href="/public/voteDetail.html?_id=${data._id}">${data.title}</a>
    </td>
    <td class="cell100 column5">
    <a href="/public/vote.html?account=${data.account}">${data.account}</a>
    </td>
    <td class="cell100 column6">
    <a href="/public/voteDetail.html?postdate=${crt_date}">${crt_date}</a>
    </td>`;

    content.insertAdjacentHTML('beforeend',addHtml);//將變數字串轉換為HTML元素插入於content
    $('#vote').append(content);//將content加入vote元素區域
}
function getUrlVal(){
    var query=window.location.search.substring(1);//取得瀏覽器視窗上網只列的搜尋字串，substring是去掉第一格字元就是?
    var vars=query.split('&');//分割字串
    for(var i=0;i<vars.length;i++){
        var pair=vars[i].split("=");
        if(pair[0]==val){//比對，相同救回傳
            return pair[1];
        }
    }
    return (false);
}