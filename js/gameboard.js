// DGG: Se inicializan las variables globales del juego

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pathPolice = './images/police.png';
var pathAmbulance = './images/ambulance.png';
var pathBall = './images/ball1.png';

canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

var fps = 30;
var frames = 0;
var time = 0;
var interval = null;
var intervalClock = null;
var endGame = false;

var goalsP1 = 0, goalsP2 = 0;
var goal = false;

var x = 128, y = 64;
var player1 = new Player(x, y, canvas.width/6 - x/4, canvas.height/2 - y/2, 'green', 10, 10, pathPolice);
var player2 = new Player(x, y, canvas.width - (canvas.width/6 + x/4 + 100), canvas.height/2 - y/2, 'red', 10, 10, pathAmbulance);
var ball = new Ball(canvas.width/2, canvas.height/2, 0, 0, pathBall);
var clock = new Clock();

var allScores = new LocalStorageManager();

// DGG: Funciones agrupadoras

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

// DGG: Bucle principal del juego

function game() {
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

// DGG: Transición al terminar el juego

function endMyGame() {
  if (endGame === true) {
    clearInterval(interval);
    
    var classToHide = document.querySelector('.myGame');
    classToHide.style.display = 'none';
    var classToShow = document.querySelector('.endGame');
    classToShow.style.display = 'flex';
    
    allScores.setScore();

  }
}

// DGG: Transición al empezar el juego

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
  interval = setInterval(game, 1000/fps);
  intervalClock = setInterval(stopClock, 1000);
  
  var classToHide = document.querySelector('.beginGame');
  classToHide.style.display = 'none';
  var classToShow = document.querySelector('.myGame');
  classToShow.style.display = 'flex';
  };

  document.querySelector('#restart-button').addEventListener('click', function() {
    window.location.replace(''); // DGG: Refresca el navegador
  });

};
