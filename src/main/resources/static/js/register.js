//获取登录对象并绑定点击事件
const login = document.querySelector('.btn')
login.addEventListener('click', function () {
    event.preventDefault();
    const email = document.querySelector('.email')
    const username = document.querySelector('.username')
    const account = document.querySelector('.account')
    const password = document.querySelector('.password')
    const passwordagin = document.querySelector('.passwordagin')

    const userInfo = {
        email: email.value, username: username.value, account: account.value, password: password.value,
    };

    //判断是否存在未输入
    if (email.value && username.value && account.value && password.value && passwordagin.value) {
        // 判断密码是否一致
        if (password.value === passwordagin.value) {
            $.ajax({
                url: '/user/register',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(userInfo),
                success: function (result) {
                    // 处理成功的结果或执行成功时的操作
                    if (result.code === 1) {
                        //注册成功，跳转到登录界面
                        window.location.href = './login.html';
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
        } else {
            alert('两次密码不一致')
        }
    } else {
        alert('不能为空')
    }
})