var alf = new alien(10, 10);
var canvas = document.getElementById('can');
var bulet01 = new bulet(60, 300);
if (canvas.getContext) {
    var c = canvas.getContext('2d');
    var alien01 = document.getElementById("alien01");
    c.drawImage(alien01, 100, 100, 40, 35);
}
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '32') {
        if (!bulet01.active) {
            bulet01.visible = true;
        }
    }
}
setInterval(function() {
    if (bulet01.visible) {
        c.fillStyle = "white";
        c.fillRect(bulet01.x, bulet01.y, 10, 50);
        bulet01.mouveUp();
        c.fillStyle = "black";
        c.fillRect(bulet01.x, bulet01.y, 10, 50);
    } else {
        c.fillStyle = "white";
        c.fillRect(bulet01.x, bulet01.y, 10, 50);
    }
}, 100);