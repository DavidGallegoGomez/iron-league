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

Player.prototype.otherPlayerHit = function(otherPlayer) {
  if (this.x + this.width  > otherPlayer.x && this.x < otherPlayer.x + otherPlayer.width &&
      this.y + this.height > otherPlayer.y && this.y < otherPlayer.y + otherPlayer.height) {
    console.log('CHOQUE');
    if(this.isMovingRight === true) { 
      this.x        -= 2*this.dx;
      otherPlayer.x += 2*this.dx;
    }
    if(this.isMovingLeft  === true) { 
      this.x        += 2*this.dx;
      otherPlayer.x -= 2*this.dx;
    }
    if(this.isMovingUp    === true) { 
      this.y        += 2*this.dy;
      otherPlayer.y -= 2*this.dy;
    }
    if(this.isMovingDown  === true) { 
      this.y        -= 2*this.dy;
      otherPlayer.y += 2*this.dy;
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