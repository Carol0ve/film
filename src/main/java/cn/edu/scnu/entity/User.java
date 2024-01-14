package cn.edu.scnu.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class User {
    @TableId
    private String email;
    private String account;
    private String username;
    private String password;
    private String isVip;
}
