var filmlist = [];
var table1 = document.getElementById("showmovies");
var collectsdiv = document.getElementById("collectlist"); 

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
	collectsdiv.style.height = 80;
    selectFilmByCollect();
});

//加载电影在table
function addMovies() {
    var row = 0;//行数
	if(filmlist.length==0){
		var rows = table1.insertRow(row);
		var height1 = collectsdiv.offsetHeight;
		height1 += 40;
		collectsdiv.style.height = height1;
		var unit = "<td><div style='width: 380px;height: 30px;'><span>收藏夹是空的，快去收藏你喜欢的电影吧！<span></div></td>"
		rows.innerHTML = unit;	
	}else{
		while (row < filmlist.length) {
		    var rows = table1.insertRow(row);
			var ID =filmlist[row].id;
			var NAME = filmlist[row].filmName;
			var SCORE = filmlist[row].score;
			var YEAR = filmlist[row].year;
			var VIP = filmlist[row].needVip;
			
			var unit = "<td><div id='img1'><a onclick='toDetail("+ID+")'><img src='img/"+ID+".jpg' width='120px' height='170px'/></a></div></td><td><div id='text1'><span>"+NAME+"</span><p><span>"+SCORE+"</span><p><span>"+YEAR+"</span><p><span>need vip:"+VIP+"</span></div></td>";
			rows.innerHTML = unit;//获取单个电影
			//增加高度
			var height1 = collectsdiv.offsetHeight;
			height1 += 170;
			collectsdiv.style.height = height1;
		    row++;
		}
	}
    
}

//切换到详情页
function toDetail(id){
    localStorage.setItem('movieid',id);
	window.location.href = 'moviedetail.html';
}


function selectFilmByCollect() {
    $.ajax({
        url: '/film/favorite',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(request),
        success: function (result) {
            filmlist = result.data;
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
	
	localStorage.setItem('is_vip',"0");//防止为空
	localStorage.removeItem('is_vip');
	
	localStorage.setItem('movieid',1);//防止为空
	localStorage.removeItem('movieid');
	
	localStorage.setItem('movieactors',"Tony");//防止为空
	localStorage.removeItem('movieactors');
	
	localStorage.setItem('skip',1);//防止为空
	localStorage.removeItem('skip');
	window.location.href = 'login_register.html';
}
