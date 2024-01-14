package cn.edu.scnu.entity;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class Result<T> {
    private Integer code;
    private String message;
    private T data;
    private Map<Object, Object> map=new HashMap<>();

    public static <T> Result<T> success(T object){
        Result<T> result=new Result<>();
        result.data=object;
        result.code=1;
        return result;
    }

    public static <T> Result<T> error(String msg){
        Result<T> result=new Result<>();
        result.message=msg;
        result.code=0;
        return result;
    }

    public Result<T> add(String key,Object value){
        this.map.put(key,value);
        return this;
    }
}
