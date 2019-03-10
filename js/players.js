function Player(width, height, x, y, color, dx, dy) {
  this.isMovingRight = false;
  this.isMovingLeft = false;
  this.isMovingUp = false;
  this.isMovingDown = false;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
  this.dx = dx;
  this.dy = dy;
}

Player.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height)
  ctx.closePath();
}

//function movePlayer(hit) {
function listenKeys() {
  document.addEventListener('keydown', function(e) {
    var myKeyCode  =  e.keyCode || e.which || 0;
    //console.log(myKeyCode);
    switch(myKeyCode) {
      case 39:
        player2.isMovingRight = true;
        break
      case 37:
        player2.isMovingLeft = true;
        break
      case 38:
        player2.isMovingUp = true;
        break
      case 40:
        player2.isMovingDown = true;
        break
      case 68:
        player1.isMovingRight = true;
        break
      case 65:
        player1.isMovingLeft = true;
        break
      case 87:
        player1.isMovingUp = true;
        break
      case 83:
        player1.isMovingDown = true;
        break
      case 71: // Resetea la posición de la pelota (usado en etapas de depuración)
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        break
    }
  }.bind(this))

  document.addEventListener('keyup', function(e) {
    var myKeyCode  =  e.keyCode || e.which || 0;
    switch(myKeyCode) {
      case 39:
        player2.isMovingRight = false;
        break
      case 37:
        player2.isMovingLeft = false;
        break
      case 38:
        player2.isMovingUp = false;
        break
      case 40:
        player2.isMovingDown = false;
        break
      case 68:
        player1.isMovingRight = false;
        break
      case 65:
        player1.isMovingLeft = false;
        break
      case 87:
        player1.isMovingUp = false;
        break
      case 83:
        player1.isMovingDown = false;
        break
    }
  }.bind(this))
}

Player.prototype.borderHit = function() {
  if (this.y <= this.dy && this.isMovingUp === true) { this.y = 0; }
  if (this.x <= this.dx && this.isMovingLeft === true) { this.x = 0; }
  if (this.y + this.height >= canvas.height - this.dy && this.isMovingDown === true) { this.y = canvas.height - this.height; }
  if (this.x + this.width >= canvas.width - this.dx && this.isMovingRight === true) { this.x = canvas.width - this.width; }
}

Player.prototype.otherPlayerHit = function(otherPlayer) { // DGG: ToDo, controlar los bordes del canvas
  if (this.x + this.width  > otherPlayer.x && this.x < otherPlayer.x + otherPlayer.width &&
      this.y + this.height > otherPlayer.y && this.y < otherPlayer.y + otherPlayer.height) {
    ///console.log('CHOQUE');
    if(this.isMovingRight === true) { 
      this.x = otherPlayer.x - this.width; // DGG: Actualizo posición justo en el punto de colisión
      //this.x        -= 1*this.dx; // DGG: Reboto el coche que choca
      //otherPlayer.x += 1*this.dx; // DGG: Reboto el coche que recibe el choque
      
      //this.dx = 0; // DGG: Anulamos velocidades
      //otherPlayer.dx = 0; // DGG: Anulamos velocidades
    }
    if(this.isMovingLeft  === true) { 
      this.x = otherPlayer.x + this.width;
      //this.x        += 1*this.dx;
      //otherPlayer.x -= 1*this.dx;
      
      //this.dx = 0; // DGG: Anulamos velocidades
      //otherPlayer.dx = 0; // DGG: Anulamos velocidades
    }
    if(this.isMovingUp    === true) { 
      this.y = otherPlayer.y + this.height;
      //this.y        += 1*this.dy;
      //otherPlayer.y -= 1*this.dy;
      
      //this.dy = 0; // DGG: Anulamos velocidades
      //otherPlayer.dy = 0; // DGG: Anulamos velocidades
    }
    if(this.isMovingDown  === true) { 
      this.y = otherPlayer.y - this.height;
      //this.y        -= 1*this.dy;
      //otherPlayer.y += 1*this.dy;
      
      //this.dy = 0; // DGG: Anulamos velocidades
      //otherPlayer.dy = 0; // DGG: Anulamos velocidades
    }
  }
}

Player.prototype.ballHit = function(ball) {
  if (this.x + this.width  > ball.x + ball.radius && this.x < ball.x + ball.radius &&
      this.y + this.height > ball.y + ball.radius && this.y < ball.y + ball.radius) {
  
    if(this.isMovingRight === true) { 
      this.x = ball.x + ball.radius - this.width - this.dx;
      ball.dx *= -0.5;
      console.log('SLOW!!');
    }
    if(this.isMovingLeft  === true) { 
      //this.x = ball.x + ball.radius + this.width;
      ball.dx *= -1;
    }
    if(this.isMovingUp    === true) { 
      //this.y = ball.y + ball.radius + this.height;
      ball.dy *= -1;
    }
    if(this.isMovingDown  === true) { 
      //this.y = ball.y + ball.radius - this.height;
      ball.dy *= -1;
    }
  }
}

Player.prototype.moveP = function() {
  listenKeys();
  if(this.isMovingRight === true) { this.x += this.dx; }
  if(this.isMovingLeft  === true) { this.x -= this.dx; }
  if(this.isMovingUp    === true) { this.y -= this.dy; }
  if(this.isMovingDown  === true) { this.y += this.dy; }
}

function hitPlayers(player1, player2) {
  var hit = false;
  if (player1.x                  <= player2.x + player2.width &&
      player1.x + player1.width  >= player2.x &&
      player1.y                  <= player2.y + player2.height &&
      player1.height + player1.y >= player2.y) {
     // ¡colision detectada!
     //console.log('HIT!!!');
     hit = true;
 }
 return hit;
}

// Introducir rozamientos en los movimientos!!!