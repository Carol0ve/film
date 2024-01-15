//获取登录对象并绑定点击事件
const login_btn = document.querySelector('.login_btn')
login_btn.addEventListener('click', function(){
  event.preventDefault();

  //获取输入的用户名和密码
  const login_account = document.querySelector('.login_account')
  const login_password = document.querySelector('.login_password')

  const login_userInfo = {
    account: login_account.value,
    password: login_password.value
  };

  if(login_account.value && login_password.value){
    $.ajax({
      url: '/user/login',
      type: 'post',
      contentType: 'application/json;charset=utf-8',
      data: JSON.stringify(login_userInfo),
      success: function (login_result) {
          // 处理成功的结果或执行成功时的操作
          if (login_result.code === 1) {
            
              //账号密码正确，将token和账号保存在本地
              localStorage.setItem('login_token', login_result.map.token)
              localStorage.setItem('login_account', login_account.value)
              localStorage.setItem('is_vip', login_result.isVip)

              //登录成功，跳转到主页面
              window.location.href = './index.html';
          } else {
              alert("登录失败！");
          }
      },
      error: function (xhr, status, error) {
          // 处理请求失败的情况
          console.error("Request failed:", status, error);
          alert("请求失败，请检查网络或服务器配置。");
      }
  });
  }else{
    alert('用户名或密码不能为空！')
  }

})

// 滑动的状态
let flag=true
const mySwitch=()=>{
   if(flag){
       // 获取到滑动盒子的dom元素并修改它移动的位置
       $(".pre-box").css("transform","translateX(100%)")
       // 获取到滑动盒子的dom元素并修改它的背景颜色
       $(".pre-box").css("background-color","#c9e0ed")
       //修改图片的路径
       $("img").attr("src","./img/wuwu.jpeg")
       
   }
   else {
       $(".pre-box").css("transform","translateX(0%)")
       $(".pre-box").css("background-color","#edd4dc")
       $("img").attr("src","./img/waoku.jpg")
   }
   flag=!flag
}

//显示气泡效果
const bubleCreate=()=>{
   // 获取body元素
   const body = document.body
   // 创建泡泡元素
   const buble = document.createElement('span')
   // 设置泡泡半径
   let r = Math.random()*5 + 25 //半径大小为25~30
   // 设置泡泡的宽高
   buble.style.width=r+'px'
   buble.style.height=r+'px'
   // 设置泡泡的随机起点
   buble.style.left=Math.random()*innerWidth+'px'
   // 为body添加buble元素
   body.append(buble)
   // 4s清除一次泡泡
   setTimeout(()=>{
       buble.remove()
   },4000)
}
// 每200ms生成一个泡泡
setInterval(() => {
   bubleCreate()
}, 200);