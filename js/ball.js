function Ball(x, y, dx, dy, color) {
  //this.x = 100;
  //this.y = 100;
  this.x = x;
  this.y = y;
  this.dx = dx; // Aleatorio???
  this.dy = dy; // Aleatorio???
  this.radius = 25;
  this.color = color;
};

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
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

Ball.prototype.collision = function(){
  // Colisión de la bola con las paredes
  if (this.y + this.dy > canvas.height - 1 * this.radius || this.y + this.dy < 1 * this.radius ) {
    this.dy *= -1; // Aleatorio???
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
        // && pcmX === player.y + player.dy
        this.dx = player.dx;
        this.dy = Math.floor(Math.random() * 3);
        this.x = pcmX + this.radius;
        //this.y = pcmY + this.radius;
        //this.x = pcmX + this.radius;
        //player.x = pcmX - player.dx;
      }
      if(player.isMovingLeft  === true) { 
        //this.x = ball.x + ball.radius + this.width;
        //this.dx += player.dx;
        this.x = pcmX + player.dx + 10;
        this.y = pcmY + player.dy + 10;
      } 
    }
    if (pcmY === player.y || pcmY === player.y + player.height) {
      this.dy *= -1;
      if(player.isMovingUp === true || player.isMovingDown  === true) { 
        //this.y = ball.y + ball.radius + this.height;
        //this.dy += player.dy;
        /*this.x = pcmX + player.dx + 10;
        this.y = pcmY + player.dy + 10;*/

        this.dy = player.dy;
        this.dx = Math.floor(Math.random() * 3);
        this.y = pcmY + this.radius;
      }
      /*if(player.isMovingDown  === true) { 
        //this.y = ball.y + ball.radius - this.height;
        //this.dy += player.dy;
        this.x = pcmX + player.dx + 10;
        this.y = pcmY + player.dy + 10;
      }*/
    }

    /*if(player.isMovingRight === true) { 
      // && pcmX === player.y + player.dy
      //this.dx += player.dx;
      this.x = pcmX + player.dx + 10;
      this.y = pcmY + player.dy + 10;
      //this.x = pcmX + this.radius;
      //player.x = pcmX - player.dx;
    }
    if(player.isMovingLeft  === true) { 
      //this.x = ball.x + ball.radius + this.width;
      //this.dx += player.dx;
      this.x = pcmX + player.dx + 10;
      this.y = pcmY + player.dy + 10;
    }
    if(player.isMovingUp    === true && pcmY === player.y - player.dy) { 
      //this.y = ball.y + ball.radius + this.height;
      //this.dy += player.dy;
      this.x = pcmX + player.dx + 10;
      this.y = pcmY + player.dy + 10;
    }
    if(player.isMovingDown  === true && pcmY === player.y + player.dy) { 
      //this.y = ball.y + ball.radius - this.height;
      //this.dy += player.dy;
      this.x = pcmX + player.dx + 10;
      this.y = pcmY + player.dy + 10;
    }*/
    
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
  ball.dx = Math.floor(Math.random() * 3);
  ball.dy = Math.floor(Math.random() * 3);
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
}

Ball.prototype.drawScore = function() {
  var text = 'Player 1: ' + goalsP1 + ' - ' + 'Player 2: ' + goalsP2;
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width/2, 50);
}

Ball.prototype.goal = function() {
  if (this.x <= 52) { 
    //console.log('P2 GOAL!!!');
    goalsP2 ++;
    restartGame();
  }
  else if (this.x >= canvas.width - 52) { 
    //console.log('P1 GOAL!!!');
    goalsP1 ++;
    restartGame();
  }
  //console.log('P1: ' + goalsP1 + ' - P2: ' + goalsP2);

}
