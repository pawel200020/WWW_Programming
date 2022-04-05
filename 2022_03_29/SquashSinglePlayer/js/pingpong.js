movement = 10;
isGamePlayed = false;
play = false;
ballG = {
    speed: 8,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}
fails = 0;
points = 0;
var map = new Map();


$(function() {

    $("#startgame").click(function() {
        $(this).attr('disabled', true);
        $("#endgame").attr('disabled', false);
        play = true;
        var name = $("#nick").val();
        $("#hi").html("Hello " + name + ", let's play a game ");
        $("#hi").css('visibility', 'visible');
        playGame();


    });
    $("#endgame").click(function() {
        play = false;
        $(this).attr('disabled', true);
        $("#startgame").attr('disabled', false);
        $("#paddle").css({ top: 440, left: 250, position: 'absolute' });
        $("#hi").css('visibility', 'hidden');
        setPoints();
        refreshLeadboard();
        resetBall();

    })

});

function playGame() {
    if (!isGamePlayed) {
        setInterval(moveball, 30);
    }
    isGamePlayed = true;

    $(document).keydown(function(e) {
        if (e.which === 37 && play) {
            var top = parseInt($("#paddle").css("left"));
            $("#paddle").css("left", top - movement);
        }
        if (e.which === 39 && play) {
            var top = parseInt($("#paddle").css("left"));
            $("#paddle").css("left", top + movement);
        }
    });
}

function moveball() {
    if (play) {
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
                points++;
                $("#points").html(points);
            }
        }


        if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
            fails++;
            $("#fails").html(fails);
            setPoints();
            refreshLeadboard();
            points = 0;
            $("#points").html(points);
            ball.x = 100;
            ball.y = 100;
            $("#ball").css({
                "left": ball.x,
                "top": ball.y
            });
            ball.directionX = 1;
            play = false;
            $("#endgame").attr('disabled', true);
            $("#startgame").attr('disabled', false);
            $("#paddle").css({ top: 440, left: 350, position: 'absolute' });
            $("#hi").css('visibility', 'hidden');
        }

        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
    }


}

function resetBall() {
    points = 0;
    $("#fails").html(points);
    ball.x = parseInt($("#playground").css("width")) / 2;
    ball.y = parseInt($("#playground").css("height")) / 2;
    $("#ball").css({
        "left": ball.x,
        "top": ball.y
    });
    ball.directionX = 1;


    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    $("#ball").css({
        "left": ball.x,
        "top": ball.y
    });
}

function setPoints() {
    var name = $("#nick").val();
    if (map.has(name)) {
        if (map.get(name) < points) {
            map.set(name, points)
        }
    } else {
        map.set(name, points);
    }
}

function refreshLeadboard() {
    $("#leadboard").empty();
    map = new Map([...map].sort((a, b) => (a[1] < b[1] ? 1 : -1)));
    map.forEach((values, keys) => {
        $("#leadboard").append('<div class="row" id ="row' + keys + '"></div>');

        $('#row' + keys).append('<div class="name">' + keys + '</div>')
        $('#row' + keys).append('<div class="score">' + values + '</div>');
    });
}

map[Symbol.iterator] = function*() {
    yield*[...this.entries()].sort((a, b) => a[1] - b[1]);
}