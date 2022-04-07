function giveSpace(n) {
    for (let i = 0; i < n; i++) {
        var element = document.getElementById("myDiv");
        element.innerHTML += "<br/>";
    }
}
giveSpace(21);
var element = document.getElementById("myDiv");
element.innerHTML += "<hr/>";

function test2() {
    var element = document.getElementById("div2");
    element.className = "circleBase type1 replaced";
}