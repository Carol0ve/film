var request = [];

function getFilmList(userInfo) {
    $.ajax({
        url: '/film/genre',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(userInfo),
        success: function (result) {

        }

    })
}