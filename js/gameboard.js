var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pathPolice = './images/police.png';
var pathAmbulance = './images/ambulance.png';
var pathBall = './images/ball1.png';
//canvas.height = 600;
//canvas.width = 800;

canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth - 50;

var fps = 30;
var frames = 0;
var time = 0;
var endGame = false;
//var isPause = false;

var goalsP1 = 0, goalsP2 = 0;
var goal = false;
//var isPause = false;

//function start() {
  //var x = 200, y = 100;
  var x = 128, y = 64;
  var player1 = new Player(x, y, canvas.width/6 - x/4, canvas.height/2 - y/2, 'green', 10, 10, pathPolice);
  var player2 = new Player(x, y, canvas.width - (canvas.width/6 + x/4 + 100), canvas.height/2 - y/2, 'red', 10, 10, pathAmbulance);
  var ball = new Ball(canvas.width/2, canvas.height/2, 0, 0, '#00F', pathBall);
  var clock = new Clock();
//}


//var ball2 = new Ball(50, 50, 7, 3, '#F00');

//function Pause() { // Comprobar el funcionamiento!!!
//  document.addEventListener('keydown', function(e) {
//    switch(e.keyCode) {
//      case 80: // Tecla 'P' para pausar
//        isPause = !isPause
//        isPause ? clearInterval(interval) : interval = setInterval(game, 1000/fps);
//    }
//  }.bind(this))
//}

// Miriam Mendez y Sonia RoCa (Servicio de Carreras)

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Meterlo en una función clear()???
  drawPlayGround();
  ball.draw();
  player1.draw();
  player2.draw();
  
  //ball.collisionPoint(player1);
  //ball.collisionPoint(player2);
}

function hit() {
  player1.otherPlayerHit(player2);
  player2.otherPlayerHit(player1);
  
  player1.borderHit();
  player2.borderHit();

  //player1.ballHit(ball);
  //player2.ballHit(ball);
//
  ball.collisionPoint(player1);
  ball.collisionPoint(player2);
  ball.collision();
}

function move() {
  player1.moveP();
  player2.moveP();
  ball.move();
}

//start();
function game() {
  //Pause();
  //console.log(time);
  endMyGame();
  frames++;
  move();
  hit();
  draw();
  ball.goal();
  ball.drawScore();
  clock.parseTime();
  clock.drawTime();
}

var interval = setInterval(game, 1000/fps); // CAMBIAR POR requestAnimationFrame

function endMyGame() {
  if (endGame === true) {
    clearInterval(interval);
    alert('YOU WIN!!!');
    // Falta poner ganador y puntuaciones globales
  }
}
