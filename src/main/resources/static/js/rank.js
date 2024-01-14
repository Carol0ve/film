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
var is_vip = 0;

$(document).ready(function () {
    var vip1 = document.getElementById("vip1");
    if (is_vip == 1) {
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


// function  getfilmlist(){
//     $.ajax({
//         url:'/film/all',
//         type:'post',
//         contentType:'application/json;charset=utf-8',
//         data:JSON.stringify(request),
//         success:function(result){
// 		filmlist = result.data;
// 		addMovies();
//     }
//     })
// }

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

function selectFilmByGenre() {
    $.ajax({
        url: '/film/genre',
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

function selectFilmByArea() {
    $.ajax({
        url: '/film/area',
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

function selectFilmByYear() {
    $.ajax({
        url: '/film/yearIn',
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

function selectFilmBeforeYear() {
    $.ajax({
        url: '/film/yearBefore',
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

function selectFilmByActor() {
    $.ajax({
        url: '/film/actor',
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

// function  selectFilmByGenre(request){
//     $.ajax({
//         url:'/film/genre',
//         type:'post',
//         contentType:'application/json;charset=utf-8',
//         data:JSON.stringify(request),
//         success:function(result){
// 		addMovies();
//         }
//     })
// }

function userLogin(userInfo) {
    $.ajax({

        url: '/user/login',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(userInfo),
        success: function (result) {

        }
    })
}

function userRegister(userInfo) {
    $.ajax({

        url: '/user/register',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(userInfo),
        success: function (result) {

        }
    })
}

function activateVIP(userInfo) {
    $.ajax({

        url: '/user/vip',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(userInfo),
        success: function (result) {

        }
    })
}

function userLogout(token) {
    $.ajax({

        url: '/user/logout', headers: {"Authorization": token},
        type: 'post',
        contentType: 'application/json;charset=utf-8',

        success: function (result) {

        }
    })
}

function inIt(token) {
    $.ajax({

        url: '/index', headers: {"Authorization": token},
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {

        }
    })
}
	
