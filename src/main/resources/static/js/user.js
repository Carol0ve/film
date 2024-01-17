var filmlist = [];
var filmactor = [];
var filmdetail = [];
var AREAS = [];
var TYPES = [];
var hangshu = 0;
var filmIDNow=20001;
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
    console.log(filmIDNow)
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
        getfilmlist();
    }
    else selectFilmById(filmIDNow);
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

        if (obj.innerText > 2015) {
            hangshu = 3;
            request.year = obj.innerText;
            selectFilmByYear();
        } else {
            hangshu = 4;
            request.year = obj.innerText + 10;
            selectFilmBeforeYear();
        }
    } else if (Sort == "actor") {
        hangshu = 5;
        request.actor = obj.innerText;
        selectFilmByActor();
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
        var ts = "<a onclick='sortMovies(this)' href='index.html'>" + filmactor[i] + "</a>&nbsp;";
        ACTORS += ts;
    }
    for (var i = 0; i < AREAS.length; i++) {
        var ts = "<a onclick='sortMovies(this)' href='index.html'>" + AREAS[i] + "</a>&nbsp;";
        AREA += ts;
    }
    for (var i = 0; i < TYPES.length; i++) {
        var ts = "<a onclick='sortMovies(this)' href='index.html'>" + TYPES[i] + "</a>&nbsp;";
        TYPE += ts;
    }
    var unit = "<table><tr><td><img id='image' src='img/" + ID + ".jpg' width='300px' height='450px'></td><td><div style='font-size: 25px;'><span>" + NAME + "</span><p><span>" + YEAR + "</span><p><span>";
    unit += AREA + "</span><p><span>" + TYPE + "</span><p><span>" + SCORE + "</span><p><span>主演：</span><p><span >" + ACTORS + "</span><p><span>" + INTRO + "</span></div></td></tr></table>";
    det1.innerHTML = unit;
    console.log(unit)
}

function Watchmovie() {
    if (is_vip == 1) {
        window.location.href = 'https://www.bilibili.com/movie/?spm_id_from=333.1007.0.0';
    } else {
        alert("你不是会员，无法观看！");
    }
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
            var unit = "<div id='unit'><a href='moviedetail.html' onclick='temp("+ID+")'><img src='img/" + ID + ".jpg'/></a><br/><span id='name'>" + NAME + "</span></div>";
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

function selectFilmById(id) {
    console.log("select")
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
            console.log(filmdetial)
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

function  selectFilmByGenre(request){
    $.ajax({
        url:'/film/genre',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){
		addMovies();
        }
    })
}

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
	
var is_vip = localStorage.getItem('is_vip');
var vip1 = document.getElementById("vip1");
//页面初始化加载
$(document).ready(function () {
	//修改顶部vip图标
    if (is_vip == "yes") {
        vip1.innerText = " VIP ";
        vip1.style.backgroundColor = "red";
    } else {
        vip1.innerText = " 非VIP ";
        vip1.style.backgroundColor = "gray";
    }
	
    //加载用户页面信息
    const email = document.getElementById(".mecarbottm-email");
    email.textContent = localStorage.getItem('login_email');

    const username = document.getElementById(".mecarbottm-value");
    username.textContent = localStorage.getItem('login_username');

    const account = document.getElementById(".mecarbottm-account");
    account.textContent = localStorage.getItem('login_account');

    const is_vip = localStorage.getItem('is_vip');
    const button = document.querySelector('.button')//开通会员按钮

    if (is_vip == "yes") {
        button.textContent = "您已是VIP";
    }
	
});

//点击充值后修改VIP为yes
const buttonsty = document.querySelector('.buttonsty')
buttonsty.addEventListener('click', function(){
    localStorage.setItem('is_vip', "yes");
	button.textContent = "您已是VIP";
})

//退出登录删除所有本地数据
const li_loginout = document.querySelector('.li_loginout')
li_loginout.addEventListener('click', function(){
	localStorage.setItem('login_token',"0");//防止为空
	localStorage.removeItem('login_token');
	
	localStorage.setItem('login_account',"0");//防止为空
	localStorage.removeItem('login_account');
	
	localStorage.setItem('is_vip',"0");//防止为空
	localStorage.removeItem('is_vip');
	
	localStorage.setItem('movieid',1);//防止为空
	localStorage.removeItem('movieid');
	
	localStorage.setItem('movieactors',"Tony");//防止为空
	localStorage.removeItem('movieactors');
	
	localStorage.setItem('skip',1);//防止为空
	localStorage.removeItem('skip');
	
	window.location.href = 'login_register.html';
})


//发送修改vip请求
