movement = 10;
ballG = {
    speed: 8,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}
fails = 0;

$(function() {

    setInterval(moveball, 30);
    $(document).keydown(function(e) {
        if (e.which === 37) {
            var top = parseInt($("#paddle").css("left"));
            $("#paddle").css("left", top - movement);
        }
        if (e.which === 39) {
            var top = parseInt($("#paddle").css("left"));
            $("#paddle").css("left", top + movement);
        }
    });

});

function moveball() {
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = ballG;

    if (ball.y + ball.speed * ball.directionY < 0) ball.directionY = 1;
    if (ball.x + ball.speed * ball.directionX < 0) ball.directionX = 1;
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) ball.directionX = -1;

    var paddleWidth = parseInt($("#paddle").css("width"));
    var paddleX = parseInt($("#paddle").css("left"));
    var paddleYTop = parseInt($("#paddle").css("top"));
    var paddleYBottom = parseInt($("#paddle").css("top")) + parseInt($("#paddle").css("height"));

    if ((ball.x + ball.speed * ball.directionX >= paddleX) &&
        (ball.x + ball.speed * ball.directionX < paddleX + (paddleWidth + 5))) {
        if ((ball.y + ball.speed * ball.directionY <= paddleYBottom) &&
            (ball.y + ball.speed * ball.directionY >= paddleYTop)) {
            ball.directionY = -1;
        }
    }


    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        fails++;
        $("#fails").html(fails);
        ball.x = parseInt($("#playground").css("width")) / 2;
        ball.y = parseInt($("#playground").css("height")) / 2;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = 1;
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    $("#ball").css({
        "left": ball.x,
        "top": ball.y
    });
}