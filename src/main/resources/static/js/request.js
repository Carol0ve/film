
exports.hw = getfilmlist;

function  getfilmlist(request){
    $.ajax({
        url:'/film/all',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

    }
    })
}
function  selectFilmByGenre(request){
    $.ajax({
        url:'/film/genre',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  selectFilmByArea(request){
    $.ajax({
        url:'/film/area',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  selectFilmByYear(request){
    $.ajax({
        url:'/film/yearIn',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  selectFilmBeforeYear(request){
    $.ajax({
        url:'/film/yearBefore',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  selectFilmByActor(request){
    $.ajax({
        url:'/film/actor',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  selectFilmByGenre(request){
    $.ajax({
        url:'/film/genre',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(request),
        success:function(result){

        }
    })
}

function  userLogin(userInfo){
    $.ajax({

        url:'/user/login',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(userInfo),
        success:function(result){

        }
    })
}

function  userRegister(userInfo){
    $.ajax({

        url:'/user/register',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(userInfo),
        success:function(result){

        }
    })
}

function  activateVIP(userInfo){
    $.ajax({

        url:'/user/vip',
        type:'post',
        contentType:'application/json;charset=utf-8',
        data:JSON.stringify(userInfo),
        success:function(result){

        }
    })
}

function  userLogout(token){
    $.ajax({

        url:'/user/logout',headers:{"Authorization":token},
        type:'post',
        contentType:'application/json;charset=utf-8',

        success:function(result){

        }
    })
}

function  inIt(token){
    $.ajax({

        url:'/index',headers:{"Authorization":token},
        type:'post',
        contentType:'application/json;charset=utf-8',
        success:function(result){

        }
    })
}