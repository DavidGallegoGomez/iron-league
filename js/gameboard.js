var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pathPolice = './images/police.png';
var pathAmbulance = './images/ambulance.png';
var pathBall = './images/ball1.png';

canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth - 50;

var fps = 30;
var frames = 0;
var time = 0;
var interval = null;
var intervalClock = null;
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

// Miriam Mendez y Sonia RoCa (Servicio de Carreras)

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Meterlo en una función clear()???
  drawPlayGround();
  ball.draw();
  player1.draw();
  player2.draw();
}

function hit() {
  player1.otherPlayerHit(player2);
  player2.otherPlayerHit(player1);
  
  player1.borderHit();
  player2.borderHit();

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

//var interval = setInterval(game, 1000/fps); // CAMBIAR POR requestAnimationFrame

function endMyGame() {
  if (endGame === true) {
    clearInterval(interval);
    ////clearInterval(intervalClock);
    //console.log('YOU WIN!!!');
    // Falta poner ganador y puntuaciones globales
    var classToHide = document.querySelector('.myGame');
    classToHide.style.display = 'none';
    var classToShow = document.querySelector('.endGame');
    classToShow.style.display = 'flex';
  }
}

window.onload = function() {
  document.getElementById("green-button").onclick = function() {
  interval = setInterval(game, 1000/fps); // CAMBIAR POR requestAnimationFrame
  intervalClock = setInterval(stopClock, 1000);
  
  var classToHide = document.querySelector('.beginGame');
  classToHide.style.display = 'none';
  var classToShow = document.querySelector('.myGame');
  classToShow.style.display = 'flex';
  };
};