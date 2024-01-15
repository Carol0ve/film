//获取登录对象并绑定点击事件
const login = document.querySelector('.btn')
login.addEventListener('click', function(){
  event.preventDefault();

  //获取输入的用户名和密码
  const account = document.querySelector('.account')
  const password = document.querySelector('.password')

  const userInfo = {
    account: account.value,
    password: password.value
  };

  if(account.value && password.value){
    $.ajax({
      url: '/user/login',
      type: 'post',
      contentType: 'application/json;charset=utf-8',
      data: JSON.stringify(userInfo),
      success: function (result) {
          // 处理成功的结果或执行成功时的操作
          if (result.code === 1) {
            
              //账号密码正确，将token和账号保存在本地
              localStorage.setItem('token', result.map.token)
              localStorage.setItem('account', account.value)

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