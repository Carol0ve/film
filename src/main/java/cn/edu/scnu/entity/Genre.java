package cn.edu.scnu.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Genre {
    @TableId
    private Integer id;
    private String name;
}
