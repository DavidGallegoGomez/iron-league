var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 800;
var fps = 60;
var isPause = false;

var goalsP1 = 0, goalsP2 = 0;
//var isPause = false;

var x = 200, y = 100;
var player1 = new Player(x, y, canvas.width/6 - x/4, canvas.height/2 - y/2, 'green');
var player2 = new Player(x, y, canvas.width - (canvas.width/6 + x/4 + 100), canvas.height/2 - y/2, 'red');
var ball = new Ball(canvas.width/2, canvas.height/2, 0, 0, '#00F');
//var ball2 = new Ball(50, 50, 7, 3, '#F00');

function Pause() { // Comprobar el funcionamiento!!!
  document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
      case 80: // Tecla 'P' para pausar
        isPause = !isPause
        isPause ? clearInterval(interval) : interval = setInterval(game, 1000/fps);
    }
  }.bind(this))
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Meterlo en una función clear()???
  player1.draw();
  player2.draw();
  ball.draw();
}

function game() {
  Pause();
  draw();

  //player1.movePlayer();
  
  //var hit = hitPlayers();
  //console.log(hit);
  //if (!hitPlayers()) {
    var hit = hitPlayers(player1, player2);
    movePlayer(hit);
  //}
  
    
  ball.move();
  ball.collision();
  ball.goal();
  //ball2.draw();
  //ball2.move();
  //ball2.collision();
  //ball2.goal();
}

var interval = setInterval(game, 1000/fps);
