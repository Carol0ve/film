var filmlist = [];
var table1 = document.getElementById("showmovies");
var request = {
    "page": 1,
    "size": 18,
    "genre": [],
    "area": "",
    "sort": "default",
    "actor": "",
    "year": ""
};
//后端读取是否为vip
var is_vip = localStorage.getItem('is_vip');

$(document).ready(function () {
    var vip1 = document.getElementById("vip1");
    if (is_vip == "yes") {
        vip1.innerText = " VIP ";
        vip1.style.backgroundColor = "red";
    } else {
        vip1.innerText = " 非VIP ";
        vip1.style.backgroundColor = "gray";
    }
    table1.innerHTML = "";
    getfilmlist();
});

//读取
var page = document.getElementById("page");
var page0 = 1;//页数

var Sort = "";
var totalpage = 0;


//分类展示
function sortMovies(obj) {

    table1.innerHTML = "";
    page.innerText = 1;
    //连接后端
    page0 = 1;
    request.page = page0;

    request.sort = obj.id;

    getfilmlist();
}

//上一页操作
function backPage() {
    if (page0 > 1) {
        page0--;
        page.innerText = page0;
        //读取page0的值来跟换页面
        table1.innerHTML = "";
        request.page = page0;
        getfilmlist();
    }
}

//下一页操作
function nextPage() {
    if (page0 < totalpage) {
        page0++;//页数
    }
    page.innerText = page0;
    table1.innerHTML = "";
    request.page = page0;
    getfilmlist();
}

//加载电影在table
function addMovies() {

    var row = 0;
    var column = 0;
    var i = 0;
    while (row != 3 && i < filmlist.length) {
        var rows = table1.insertRow(row);
        column = 0;
        while (column != 6 && i < filmlist.length) {
            var cell = rows.insertCell(column);
            var ID = filmlist[i].id;
            var NAME = filmlist[i].filmName;
            var WEEK = filmlist[i].popularityWeek;
            var MONTH = filmlist[i].popularityMonth;
            var ALL = filmlist[i].popularityAll;
            var INTRO = filmlist[i].introduction;
            var SCORE = filmlist[i].score;
            var VIP = filmlist[i].needVip;
            var YEAR = filmlist[i].year;
            i++;
            var unit = "<div id='unit'><a onclick='toDetail("+ID+")'><img src='img/" + ID + ".jpg'/></a><br/><span id='name'>" + NAME + "</span></div>";
            cell.innerHTML = unit;//获取单个电影
            column++;
        }
        row++;
    }
}

//切换到详情页
function toDetail(id){
    localStorage.setItem('movieid',id);
	window.location.href = 'moviedetail.html';
}



function getfilmlist() {
    $.ajax({
        url: '/film/all',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(request),
        success: function (result) {
            filmlist = result.data;
            totalpage = result.map.page;
            addMovies();
        }
    })
}


//退出登录删除所有本地数据
function Logout(){
	localStorage.setItem('login_token',"0");//防止为空
	localStorage.removeItem('login_token');
	
	localStorage.setItem('login_account',"0");//防止为空
	localStorage.removeItem('login_account');
	
	localStorage.setItem('token',"0");//防止为空
	localStorage.removeItem('token');
	
	localStorage.setItem('account',"0");//防止为空
	localStorage.removeItem('account');
	
	localStorage.setItem('is_vip',"0");//防止为空
	localStorage.removeItem('is_vip');
	
	localStorage.setItem('movieid',1);//防止为空
	localStorage.removeItem('movieid');
	
	localStorage.setItem('movieactors',"Tony");//防止为空
	localStorage.removeItem('movieactors');
	
	localStorage.setItem('skip',1);//防止为空
	localStorage.removeItem('skip');
	
	localStorage.setItem('username',"0");//防止为空
	localStorage.removeItem('username');
	
	localStorage.setItem('email',"0");//防止为空
	localStorage.removeItem('email');
	
	window.location.href = 'login_register.html';
}