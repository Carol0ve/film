package cn.edu.scnu.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Film {
    @TableId
    private Integer id;
    private String filmName;
    private Integer popularityWeek;
    private Integer popularityMonth;
    private Integer popularityAll;
    private String introduction;
    private String score;
    private String needVip;
    private Integer year;
}
