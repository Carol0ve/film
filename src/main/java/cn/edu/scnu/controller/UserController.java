package cn.edu.scnu.controller;

import cn.edu.scnu.entity.Result;
import cn.edu.scnu.entity.User;
import cn.edu.scnu.serivce.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    //用户登录
    @RequestMapping("/user/login")
    public Result<User> userLogin(@RequestBody Map<Object, Object> map) {
        String account = (String) map.get("account");
        String password = (String) map.get("password");
        User user = userService.loginCheck(account, password);
        if (user != null) return Result.success(user).add("token", userService.generateToken(user));
        else return Result.error("账号或密码输入错误，请重新输入");
    }

    //用户注册
    @RequestMapping("/user/register")
    public Result<String> userRegister(@RequestBody Map<Object, Object> map) {
        String email = (String) map.get("email");
        String username = (String) map.get("username");
        String account = (String) map.get("account");
        String password = (String) map.get("password");
        if (userService.userRegister(email, username, account, password)) return Result.success("注册成功！");
        else return Result.error("该邮箱已被注册，请登录!");
    }

    //用户开通VIP
    @RequestMapping("/user/vip")
    public Result<String> activateVIP(@RequestHeader("Authorization") String token) {
        userService.activateVip(userService.getUserByToken(token).getEmail());
        return Result.success("开通VIP成功");
    }


    //用户退出登录
    @RequestMapping("/user/logout")
    public Result<String> userLogout(@RequestHeader("Authorization") String token) {
        userService.logout(token);
        return Result.success("退出登录成功！");
    }

    @RequestMapping("/username")
    public Result<String> changeUsername(@RequestHeader("Authorization") String token){
        userService.updateUsername(token);
        return Result.success("修改成功！");
    }
}
