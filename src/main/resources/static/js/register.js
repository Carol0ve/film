//获取登录对象并绑定点击事件
const register_btn = document.querySelector('.register_btn')
register_btn.addEventListener('click', function(){
  event.preventDefault();
  const register_email = document.querySelector('.register_email')
  const register_username = document.querySelector('.register_username')
  const register_account = document.querySelector('.register_account')
  const register_password = document.querySelector('.register_password')
  const register_passwordagin = document.querySelector('.register_passwordagin')

  const register_userInfo = {
    email: register_email.value,
    username: register_username.value,
    account: register_account.value,
    password: register_password.value,
  };
  // console.log(register_userInfo.register_account,register_userInfo.register_email)
  // 判断是否存在未输入
  if(register_email.value && register_username.value && register_account.value && register_password.value && register_passwordagin.value){
    // 判断密码是否一致
    if(register_password.value === register_passwordagin.value){
        $.ajax({
          url:'/user/register',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          data: JSON.stringify(register_userInfo),
          success: function (register_result) {
              // 处理成功的结果或执行成功时的操作
              if (register_result.code === 1) {
                  //注册成功，跳转到登录界面
                  window.location.href = './login_register.html';
              } else {
                  alert("注册失败！请尝试重新注册");
              }
          },
          error: function (xhr, status, error) {
              // 处理请求失败的情况
              console.error("Request failed:", status, error);
              alert("请求失败，请检查网络或服务器配置。");
          }
      });
    }else{
      alert('两次密码不一致')
    }
  }else{
    alert('不能为空')
  }
})