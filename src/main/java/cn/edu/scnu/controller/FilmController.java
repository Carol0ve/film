package cn.edu.scnu.controller;

import cn.edu.scnu.entity.Film;
import cn.edu.scnu.entity.Result;
import cn.edu.scnu.serivce.FilmService;
import cn.edu.scnu.tools.FilmQueryInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/film")
@RestController
public class FilmController {
    @Autowired
    private FilmService filmService;

    //获取所有电影列表（可选排序方式）
    @RequestMapping("/all")
    public Result<List<Film>> getFilmList(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        String sort = filmQueryInfo.getSort();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.getFilmList(page, size, sort);
    }

    //按照题材筛选
    @RequestMapping("/genre")
    public Result<List<Film>> selectFilmByGenre(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        String sort = filmQueryInfo.getSort();
        List<String> genres = filmQueryInfo.getGenre();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmByGenre(page, size, genres, sort);
    }

    //按照地区筛选
    @RequestMapping("/area")
    public Result<List<Film>> selectFilmByArea(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        String sort = filmQueryInfo.getSort();
        String area = filmQueryInfo.getArea();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmByArea(page, size, area, sort);
    }

    //按照演员筛选
    @RequestMapping("/actor")
    public Result<List<Film>> selectFilmByActor(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        String sort = filmQueryInfo.getSort();
        String actor = filmQueryInfo.getActor();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmByActor(page, size, actor, sort);
    }

    //按照具体年份筛选
    @RequestMapping("/yearIn")
    public Result<List<Film>> selectFilmByYear(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        int year = filmQueryInfo.getYear();
        String sort = filmQueryInfo.getSort();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmByYear(page, size, year, sort);
    }

    //按照年份筛选旧电影
    @RequestMapping("/yearBefore")
    public Result<List<Film>> selectFilmBeforeYear(@RequestBody FilmQueryInfo filmQueryInfo) {
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        int year = filmQueryInfo.getYear();
        String sort = filmQueryInfo.getSort();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmBeforeYear(page, size, year, sort);
    }

    //根据ID获取电影演员列表
    @RequestMapping("/{id}")
    public Result<List<String>> getFilmInfo(@PathVariable String id,@RequestHeader("Authorization") String token){
        return filmService.selectFilmById(Integer.parseInt(id),token);
    }

    //查询VIP专享
    @RequestMapping("/vip")
    public Result<List<Film>> getVipFilm(@RequestBody FilmQueryInfo filmQueryInfo){
        int page = filmQueryInfo.getPage();
        int size = filmQueryInfo.getSize();
        String sort = filmQueryInfo.getSort();
        if (!sort.equals("score") && !sort.equals("default")) sort = "popularity_" + sort;
        return filmService.selectFilmByVIP(page,size,sort);
    }

    //获取题材列表
    @RequestMapping("/genreList")
    public Result<List<String>> getGenreList() {
        return filmService.getGenreList();
    }

    //获取地区列表
    @RequestMapping("/areaList")
    public Result<List<String>> getAreaList() {
        return filmService.getAreaList();
    }

    //查询用户收藏
    @RequestMapping("/favorite/{account}")
    public Result<List<Film>> getFavoriteFilm(@PathVariable String account){
        return filmService.selectUserFavList(account);
    }

    @RequestMapping("/addToFav/{id}")
    public void addToFavorite(@PathVariable String id,@RequestHeader("Authorization") String token){
        filmService.addToFavList(Integer.parseInt(id),token);
    }

    @RequestMapping("/cancelFav/{id}")
    public void cancelFavorite(@PathVariable String id,@RequestHeader("Authorization") String token){
        filmService.deleteFavorite(Integer.parseInt(id),token);
    }
}
