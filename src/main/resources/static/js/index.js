var filmlist = [];
var filmactor = [];
var filmdetail = [];
var AREAS = [];
var TYPES = [];
var hangshu = 0;
// var filmIDNow=20001;
var table1 = document.getElementById("showmovies");
var det1 = document.getElementById("det");
var request = {
    "page": 1,
    "size": 18,
    "genre": [],
    "area": "",
    "sort": "default",
    "actor": "",
    "year": ""
};
var is_vip = 0;
$(document).ready(function () {
	
    // 更新vip状态
    var vip1 = document.getElementById("vip1");
    if (is_vip == 1 || localStorage.getItem('') == 1) {
        vip1.innerText = " VIP ";
        vip1.style.backgroundColor = "red";
    } else {
        vip1.innerText = " 非VIP ";
        vip1.style.backgroundColor = "gray";
    }
	if(table1!=null) {
		table1.innerHTML = "";
		if(localStorage.getItem('skip')){
			localStorage.setItem('skip',0);
			hangshu = 5;
			request.actor = localStorage.getItem('movieactors');
			selectFilmByActor();
		}else{
			getfilmlist();
		}
	}
	else selectFilmById();
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
    Sort = obj.parentElement.parentElement.id;//获取标签一级分类
    page0 = 1;
    request.page = page0;
    console.log(Sort)
    if (Sort == "area") {
        hangshu = 1;
        request.area = obj.innerText;
        selectFilmByArea();
    } else if (Sort == "type") {
        hangshu = 2;
        var i = [];
        i.push(obj.innerText);
        request.genre = i;
        selectFilmByGenre();
    } else if (Sort == "year") {

        request.year = obj.innerText;
        console.log(request.year)
        if (obj.innerText > 2015) {
            hangshu = 3;
            request.year = obj.innerText;
            selectFilmByYear();
        } else {
            hangshu = 4; 
            request.year = obj.innerText;
            selectFilmBeforeYear();
        }
    } 
}

//上一页操作
function backPage() {
    if (page0 > 1) {
        page0--;
        page.innerText = page0;
        //读取page0的值来跟换页面
        table1.innerHTML = "";
        request.page = page0;
        if (hangshu == 1) {
            selectFilmByArea();
        } else if (hangshu == 2) {
            selectFilmByGenre();
        } else if (hangshu == 3) {
            selectFilmByYear();
        } else if (hangshu == 4) {
            selectFilmBeforeYear();
        } else if (hangshu == 5) {
            selectFilmByActor();
        }else{
            getfilmlist();
        }
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
    if (hangshu == 1) {
        selectFilmByArea();
    } else if (hangshu == 2) {
        selectFilmByGenre();
    } else if (hangshu == 3) {
        selectFilmByYear();
    } else if (hangshu == 4) {
        selectFilmBeforeYear();
    } else if (hangshu == 5) {
        selectFilmByActor();
    }else{
        getfilmlist();
    }
}

	
function toDetail(id){
    localStorage.setItem('movieid',id);
	window.location.href = 'moviedetail.html';
}

function showDetail() {
    var ID =filmdetial.id;
    var NAME = filmdetial.filmName;
    var INTRO = filmdetial.introduction;
    var SCORE = filmdetial.score;
    var YEAR = filmdetial.year;
    var ACTORS="";
    var AREA="";
    var TYPE="";
    for (var i = 0; i < filmactor.length; i++) {
        var ts = "<a onclick='toIndex("+filmactor[i]+")' href='index.html'>" + filmactor[i] + "</a>&nbsp;";
        ACTORS += ts;
    }
    for (var i = 0; i < AREAS.length; i++) {
        var ts =AREAS[i] +"&nbsp;";
        AREA += ts;
    }
    for (var i = 0; i < TYPES.length; i++) {
        var ts = TYPES[i]+"&nbsp;";
        TYPE += ts;
    }
    var unit = "<table><tr><td><img id='image' src='img/" + ID + ".jpg' width='300px' height='450px'></td><td><div style='font-size: 25px;'><span>" + NAME + "</span><p><span>" + YEAR + "</span><p><span>";
    unit += AREA + "</span><p><span>" + TYPE + "</span><p><span>" + SCORE + "</span><p><span>主演：</span><p><span >" + ACTORS + "</span><p><span>" + INTRO + "</span></div></td></tr></table>";
    det1.innerHTML = unit;
    // console.log(unit)
}

function Watchmovie() {
    if (is_vip == 1) {
        window.location.href = 'https://www.bilibili.com/movie/?spm_id_from=333.1007.0.0';
    } else {
        alert("你不是会员，无法观看！");
    }
}

function toIndex(movieactor){
	 localStorage.setItem('movieactors',movieactor);
	 localStorage.setItem('skip',1);
	 window.location.href = 'index.html';
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
function temp(id){
    filmIDNow=id
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
			indexdetail = 1;
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



function selectFilmById() {
    var id = localStorage.getItem('movieid');
    $.ajax({
        url: '/film/' + id,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(request),
        success: function (result) {
            filmactor = result.data;
            filmdetial = result.map.filmInfo;
            AREAS = result.map.areaInfo;
            TYPES = result.map.genreInfo;
            showDetail();
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
            console.log(filmlist)
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
	
