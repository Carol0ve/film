package cn.edu.scnu;


import cn.edu.scnu.entity.Result;
import cn.edu.scnu.serivce.FilmService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
class FilmApplicationTests {

    @Autowired
    private FilmService filmService;
    @Test
    public void test1(){
        System.out.println(filmService.selectFilmByArea(1,5,"美国","default"));
    }

    @Test
    public void test2(){
        Result<List<String>> listResult = filmService.selectFilmById(20138, "d0eede77-4476-4375-9850-e0cf8c0d90bf");
        System.out.println(listResult);
    }


}
