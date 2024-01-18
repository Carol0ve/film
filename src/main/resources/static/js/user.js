// var vip1 = document.getElementById("vip1");
//页面初始化加载
$(document).ready(function () {
    //加载用户页面信息
    var token = document.getElementById("token");
    token.innerText = localStorage.getItem('login_token');

    var username = document.getElementById("username");
    username.innerText = localStorage.getItem('login_username');

    var isvip = document.getElementById("vip9");
    isvip.innerText = localStorage.getItem('is_vip');
	
});

//点击充值后修改VIP为yes	
function becomeVip(){
	if(localStorage.getItem('is_vip')=="no"){
		localStorage.setItem('is_vip', "yes");
		activateVIP();
	}else{
		alert("会员续费成功！");
	}
}

//退出登录删除所有本地数据
var li_loginout = document.querySelector('.li_loginout')
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
function activateVIP() {
    $.ajax({
        url: '/user/vip',
		headers: {
			"Authorization": localStorage.getItem('login_token')
		},
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
			alert("VIP充值成功！");
        }
    })
}