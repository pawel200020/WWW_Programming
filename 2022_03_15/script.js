
function drawObject(c,color){
  c.clearRect(0,0, canvas.width,canvas.height);
  c.fillRect(25, 25, 100, 100);
  c.clearRect(45, 45, 60, 60);
  c.strokeRect(50, 50, 50, 50);
  c.fillStyle = color;
}

var canvas = document.getElementById('can');
if (canvas.getContext) {
  var c = canvas.getContext('2d');
  drawObject(c,'black')

}
let moveBy = 10;
window.addEventListener('load', () => {
  canvas.style.position = 'absolute';
  canvas.style.left = 0;
  canvas.style.top = 0;
});
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      drawObject(c,'blue');
      canvas.style.left = parseInt(canvas.style.left) - moveBy + 'px';
      break;
    case 'ArrowRight':
      drawObject(c,'red');
      canvas.style.left = parseInt(canvas.style.left) + moveBy + 'px';
      break;
    case 'ArrowUp':
      drawObject(c,'green');
      canvas.style.top = parseInt(canvas.style.top) - moveBy + 'px';
      break;
    case 'ArrowDown':
      drawObject(c,'yellow');
      canvas.style.top = parseInt(canvas.style.top) + moveBy + 'px';
      break;
  }
});


