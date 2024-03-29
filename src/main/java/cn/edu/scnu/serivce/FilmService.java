package cn.edu.scnu.serivce;

import cn.edu.scnu.entity.*;
import cn.edu.scnu.mapper.*;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Stream;

@Service
public class FilmService extends ServiceImpl<FilmMapper, Film> {
    @Autowired
    private FilmMapper filmMapper;
    @Autowired
    private GenreMapper genreMapper;
    @Autowired
    private AreaMapper areaMapper;
    @Autowired
    private ActorMapper actorMapper;
    @Autowired
    private FavoriteMapper favoriteMapper;
    @Autowired
    private UserService userService;

    //根据题材
    public Result<List<Film>> selectFilmByGenre(int page, int size, List<String> genre, String sort) {
        QueryWrapper<Genre> genreQueryWrapper = new QueryWrapper<>();
        genreQueryWrapper.in("name", genre).groupBy("id").having("COUNT(DISTINCT name) = " + genre.size());
        List<Genre> genres = genreMapper.selectList(genreQueryWrapper);
        return getFilmList(page, size, sort, genres.stream().map(Genre::getId));
    }

    //根据地区
    public Result<List<Film>> selectFilmByArea(int page, int size, String area, String sort) {
        QueryWrapper<Area> areaQueryWrapper = new QueryWrapper<>();
        areaQueryWrapper.eq("name", area);
        List<Area> areas = areaMapper.selectList(areaQueryWrapper);
        return getFilmList(page, size, sort, areas.stream().map(Area::getId));
    }

    //根据演员
    public Result<List<Film>> selectFilmByActor(int page, int size, String actor, String sort) {
        QueryWrapper<Actor> actorQueryWrapper = new QueryWrapper<>();
        actorQueryWrapper.eq("name", actor);
        List<Actor> actors = actorMapper.selectList(actorQueryWrapper);
        return getFilmList(page, size, sort, actors.stream().map(Actor::getId));
    }

    //根据具体年份
    public Result<List<Film>> selectFilmByYear(int page, int size, int year, String sort) {
        QueryWrapper<Film> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("year", year);
        Page<Film> pages = new Page<>(page, size);
        return getResult(sort, queryWrapper, pages);
    }

    //查询较早电影
    public Result<List<Film>> selectFilmBeforeYear(int page, int size, int year, String sort) {
        QueryWrapper<Film> queryWrapper = new QueryWrapper<>();
        queryWrapper.between("year", year - 10, year);
        Page<Film> pages = new Page<>(page, size);
        return getResult(sort, queryWrapper, pages);
    }


    //根据ID获取电影详情
    public Result<List<String>> selectFilmById(int id, String token) {

        User user = userService.getUserByToken(token);
        QueryWrapper<Favorite> favoriteQueryWrapper = new QueryWrapper<Favorite>().eq("id", id).eq("email", user.getEmail());
        Long count = favoriteMapper.selectCount(favoriteQueryWrapper);

        QueryWrapper<Actor> actorQueryWrapper = new QueryWrapper<>();
        actorQueryWrapper.eq("id", id);
        List<String> actorList = actorMapper.selectList(actorQueryWrapper).stream().map(Actor::getName).toList();
        Result<List<String>> result = Result.success(actorList);

        Film film = filmMapper.selectById(id);
        List<Area> areaList = areaMapper.selectList(new QueryWrapper<Area>().eq("id", id));
        List<Genre> genreList = genreMapper.selectList(new QueryWrapper<Genre>().eq("id", id));

        result.add("filmInfo", film);
        result.add("areaInfo", areaList.stream().map(Area::getName).toList());
        result.add("genreInfo", genreList.stream().map(Genre::getName).toList());
        if (count == 0) result.add("status", "no");
        else result.add("status", "yes");
        return result;
    }

    //获取VIP专享电影
    public Result<List<Film>> selectFilmByVIP(int page, int size, String sort) {
        QueryWrapper<Film> filmQueryWrapper = new QueryWrapper<>();
        filmQueryWrapper.eq("need_vip", "yes");
        Page<Film> filmPage = new Page<>(page, size);
        return getResult(sort, filmQueryWrapper, filmPage);
    }

    //根据筛选条件得到有ID列表时
    public Result<List<Film>> getFilmList(int page, int size, String sort, Stream<Integer> integerStream) {
        List<Integer> ids = integerStream.toList();
        if (ids.isEmpty()) return Result.error("未查询到数据");
        QueryWrapper<Film> filmQueryWrapper = new QueryWrapper<>();
        Page<Film> pages = new Page<>(page, size);
        filmQueryWrapper.in("id", ids);
        return getResult(sort, filmQueryWrapper, pages);
    }

    //没有ID列表时
    public Result<List<Film>> getFilmList(int page, int size, String sort) {
        QueryWrapper<Film> filmQueryWrapper = new QueryWrapper<>();
        Page<Film> pages = new Page<>(page, size);
        return getResult(sort, filmQueryWrapper, pages);
    }

    //最终查询
    public Result<List<Film>> getResult(String sort, QueryWrapper<Film> filmQueryWrapper, Page<Film> pages) {
        if (!sort.equals("default")) filmQueryWrapper.orderByDesc(sort);
        IPage<Film> filmIPage = filmMapper.selectPage(pages, filmQueryWrapper);

        if (filmIPage.getRecords().isEmpty()) return Result.error("未查询到数据");
        else {
            Result<List<Film>> result = Result.success(filmIPage.getRecords());
            result.add("page", filmIPage.getPages());
            result.add("total", filmIPage.getTotal());
            result.add("now", filmIPage.getRecords().size());
            return result;
        }
    }

    //获取题材列表
    public Result<List<String>> getGenreList() {
        QueryWrapper<Genre> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("DISTINCT name");
        List<String> genreList = genreMapper.selectList(queryWrapper).stream().map(Genre::getName).toList();
        return Result.success(genreList).add("length", genreList.size());
    }

    //获取地区列表
    public Result<List<String>> getAreaList() {
        QueryWrapper<Area> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("DISTINCT name");
        List<String> areaList = areaMapper.selectList(queryWrapper).stream().map(Area::getName).toList();
        return Result.success(areaList).add("length", areaList.size());
    }

    //根据账号获取收藏列表
    public Result<List<Film>> selectUserFavList(String token) {
        String email=userService.getUserByToken(token).getEmail();
        List<Favorite> list = favoriteMapper.selectList(new QueryWrapper<Favorite>().eq("email", email));
        return getFilmList(1, 200, "default", list.stream().map(Favorite::getId));
    }

    public void addToFavList(int id,String token){
        String email=userService.getUserByToken(token).getEmail();
        Favorite favorite=new Favorite();
        favorite.setId(id);
        favorite.setEmail(email);
        favoriteMapper.insert(favorite);
    }

    public void deleteFavorite(int id, String token) {
        String email=userService.getUserByToken(token).getEmail();
        QueryWrapper<Favorite> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("email",email).eq("id",id);
        favoriteMapper.delete(queryWrapper);
    }
}
