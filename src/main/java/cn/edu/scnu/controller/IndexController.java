package cn.edu.scnu.controller;

import cn.edu.scnu.entity.Result;
import cn.edu.scnu.entity.User;
import cn.edu.scnu.serivce.FilmService;
import cn.edu.scnu.serivce.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IndexController {
    @Autowired
    private UserService userService;
    @Autowired
    private FilmService filmService;

    //初始化时检测是否有缓存用户信息
    @RequestMapping("/index")
    public Result<User> init(@RequestHeader("Authorization") String token){
        if(userService.validateToken(token)) return Result.success(userService.getUserByToken(token));
        else return Result.error("请重新登录");
    }
}
