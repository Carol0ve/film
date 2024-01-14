package cn.edu.scnu;


import cn.edu.scnu.serivce.FilmService;
import cn.edu.scnu.serivce.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
class FilmApplicationTests {

    @Autowired
    private FilmService filmService;
    @Autowired
    private UserService userService;
    @Test
    public void test1(){
        System.out.println(filmService.selectFilmByArea(1,5,"美国","default"));
    }

    @Test
    public void test2(){
        userService.activateVip("123456@mail.com");
    }


}
