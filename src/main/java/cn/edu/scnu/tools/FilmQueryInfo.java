package cn.edu.scnu.tools;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
@Data
public class FilmQueryInfo implements Serializable {
    private int page;
    private int size;
    private List<String> genre;
    private String area;
    private String sort;
    private String actor;
    private int year;
}
