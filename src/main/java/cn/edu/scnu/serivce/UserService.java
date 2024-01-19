package cn.edu.scnu.serivce;

import cn.edu.scnu.entity.User;
import cn.edu.scnu.mapper.UserMapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UserService extends ServiceImpl<UserMapper, User> {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public User loginCheck(String account, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("account", account);
        User user = userMapper.selectOne(queryWrapper);
        if(user==null) return null;
        if (user.getPassword().equals(password)) {
            return user;
        } else return null;
    }

    public boolean userRegister(String email, String username, String account, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//        System.out.println(email+" "+username+" "+account+" "+password);
        queryWrapper.eq("email", email);
        if (userMapper.selectOne(queryWrapper) != null) {
            return false;
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setAccount(account);
            newUser.setPassword(password);
            newUser.setIsVip("no");
            userMapper.insert(newUser);
            return true;
        }
    }

    public void activateVip(String email) {
        User updateUser = new User();
        updateUser.setIsVip("yes");
        updateUser.setEmail(email);
        userMapper.updateById(updateUser);
    }

    public String generateToken(User user) {
        String token = UUID.randomUUID().toString();
        redisTemplate.opsForValue().set(token, user, 30, TimeUnit.MINUTES);
        return token;
    }

    public boolean validateToken(String token){
        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
    }

    public User getUserByToken(String token){
        return (User) redisTemplate.opsForValue().get(token);
    }

    public void logout(String token){
        redisTemplate.delete(token);
    }

    public void updateUsername(String token,String newUsername) {
        User userByToken = getUserByToken(token);
        userByToken.setUsername(newUsername);
        userMapper.updateById(userByToken);
    }
}
