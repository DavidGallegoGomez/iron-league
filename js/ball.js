function Ball(x, y, dx, dy, color, rutaImg) {
  //this.x = 100;
  //this.y = 100;
  this.x = x;
  this.y = y;
  this.dx = dx; // Aleatorio???
  this.dy = dy; // Aleatorio???
  //this.radius = 25;
  this.radius = 50;
  this.color = color;

  this.img = new Image();
  this.img.src = rutaImg;

  // número de imágenes diferentes
  this.img.frames = 10;
  this.img.frameIndex = 0;
};

Ball.prototype.draw = function(){
  /*ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();*/

  ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    Math.floor(this.img.width / this.img.frames),
    this.img.height,
    this.x - this.radius,
    this.y - this.radius,
    2 * this.radius,
    2 * this.radius
  );

  this.animateImg();
}

Ball.prototype.move = function(){
  this.x += this.dx;
  this.y += this.dy;
}

// return true if the rectangle and circle are colliding
Ball.prototype.rectCircleColliding = function (player) {
  var distX = Math.abs(this.x - player.x - player.width/2);
  var distY = Math.abs(this.y - player.y - player.height/2);

  //console.log(player.color + ' distX: ' + distX + ', distY: ' + distY);

  if (distX > (player.width/2 + this.radius)) { return false; }
  if (distY > (player.height/2 + this.radius)) { return false; }

  if (distX < (player.width/2)) { 
    this.dx *= -1;
    return true;
  } 
  if (distY < (player.height/2)) { 
    this.dy *= -1;
    return true;
  }

  var dx = distX - player.width/2;
  var dy = distY - player.height/2;
  //return (dx*dx + dy*dy <= (this.radius * this.radius));
  if (dx*dx + dy*dy <= (this.radius * this.radius)) {
    this.dy *= -1;
    this.dx *= -1; // PRUEBA
  }
}

function posOK(x, y, player) {
  var OK = true;
  
  // Choques con bordes del canvas
  if (this.y + this.dy > canvas.height - 1 * this.radius || this.y + this.dy < 1 * this.radius ) {
    OK = false;
    this.dy = 0;
    player.dy = 0;
    console.log('UPPPS!!!');
  }
  if (this.x + this.dx > canvas.width - 1 * this.radius || this.x + this.dx < 0 + 1 * this.radius ) {
    OK = false;
    this.dx = 0;
    player.dx = 0;
    console.log('UPPPS!!!');
  }

  // Choques con jugador
  if (this.y + this.dy > player.y + player.height - 1 * this.radius || this.y + this.dy < player.y + 1 * this.radius ) {
    OK = false;
    this.dy = 0;
    player.dy = 0;
    console.log('UPPPS!!!');
  }
  if (this.x + this.dx > player.x + player.width - 1 * this.radius || this.x + this.dx < player.x + 1 * this.radius ) {
    OK = false;
    this.dx = 0;
    player.dx = 0;
    console.log('UPPPS!!!');
  }
}

Ball.prototype.collision = function(){
  // Colisión de la bola con las paredes
  if (this.y + this.dy > canvas.height - 1 * this.radius || this.y + this.dy < 1 * this.radius ) {
    this.dy *= -1;
  }
  if (this.x + this.dx > canvas.width - 1 * this.radius || this.x + this.dx < 0 + 1 * this.radius ) {
    this.dx *= -1; // Aleatorio???
  }
  // Colisión de la bola con los coches
  ////this.rectCircleColliding(player1);
  ////this.rectCircleColliding(player2);

  //this.collisionPoint(player1);
  //this.collisionPoint(player2);
}

Ball.prototype.collisionPoint = function(player){
  var pcmX, pcmY;
  if (this.x >  player.x + player.width)                        { pcmX = player.x + player.width; }
  if (this.x <  player.x)                                       { pcmX = player.x; }
  if (this.x <= player.x + player.width && this.x >= player.x)  { pcmX = this.x; }
  if (this.y >  player.y + player.height)                       { pcmY = player.y + player.height; }
  if (this.y <  player.y)                                       { pcmY = player.y; }
  if (this.y <= player.y + player.height && this.y >= player.y) { pcmY = this.y; }

  //console.log('X: ' + pcmX + ', Y: ' + pcmY);
  var circleRectDist = Math.sqrt( (this.x - pcmX)**2 + (this.y - pcmY)**2 );
  if (circleRectDist <= this.radius) { 
    //console.log('CHOCA LA BOLA!!');
    if (pcmX === player.x || pcmX === player.x + player.width) {
      this.dx *= -1;
      if(player.isMovingRight === true) { // || player.isMovingLeft  === true) { 
        this.dx = player.dx;
        this.dy = Math.floor(Math.random() * 3 + 1);
        if ( posOK(this.x, this. y, player) ) {this.x = pcmX + 2 * this.radius; }
        player.x -= 2 * this.radius; 
      }
      if(player.isMovingLeft  === true) { 
        this.dx = -player.dx;
        this.dy = Math.floor(Math.random() * 3 + 1);
        //this.x -= this.dx;
        if ( posOK(this.x, this. y, player) ) {this.x = pcmX - 2 * this.radius; }
        //this.x = pcmX - 2 * this.radius;
        player.x += 2 * this.radius;
      } 
    }
    if (pcmY === player.y || pcmY === player.y + player.height) {
      this.dy *= -1;
      if(player.isMovingUp === true) { 
        this.dy = -player.dy;
        this.dx = Math.floor(Math.random() * 3 + 1);
        //this.y -= this.dy;
        if ( posOK(this.x, this. y, player) ) { this.y = pcmY - 2 * this.radius; }
        //this.y = pcmY - 2 * this.radius;
        player.y += 2 * this.radius;
      }
      if(player.isMovingDown  === true) { 
        this.dy = player.dy;
        this.dx = Math.floor(Math.random() * 3 + 1);
        //this.y += this.dy;
        if ( posOK(this.x, this. y, player) ) { this.y = pcmY + 2 * this.radius; }
        //this.y = pcmY + 2 * this.radius;
        player.y -= 2 * this.radius;
      }
    }
  }
  
  ctx.beginPath();
  ctx.arc(pcmX, pcmY, 3, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fill();
}

function restartGame() {
  player1.x = canvas.width/6 - x/4;
  player1.y = canvas.height/2 - y/2;
  player2.x = canvas.width - (canvas.width/6 + x/4 + 100);
  player2.y = canvas.height/2 - y/2;
  ball.dx = Math.floor(Math.random() * 5 + 1);
  ball.dy = Math.floor(Math.random() * 5 + 1);
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
}

Ball.prototype.drawScore = function() {
  var text = 'Player 1: ' + goalsP1 + ' - ' + 'Player 2: ' + goalsP2;
  ctx.font = '25px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width/2, 50);
}

Ball.prototype.goal = function() {
  //if (this.x <= 52) {
    if (this.x <= 2 * this.radius) {
    //console.log('P2 GOAL!!!');
    goalsP2 ++;
    restartGame();
  }
  //else if (this.x >= canvas.width - 52) {
    else if (this.x >= canvas.width - 2 * this.radius) {
    //console.log('P1 GOAL!!!');
    goalsP1 ++;
    restartGame();
  }
  //console.log('P1: ' + goalsP1 + ' - P2: ' + goalsP2);
}

Ball.prototype.animateImg = function() {
  if (frames % 2 === 0) {
    this.img.frameIndex += 1;

    // Si el frame es el último, se vuelve al primero
    if (this.img.frameIndex > 9) this.img.frameIndex = 0;
  }
};