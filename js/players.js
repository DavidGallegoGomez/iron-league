function Player(width, height, x, y, color) {
  this.isMovingRight = false;
  this.isMovingLeft = false;
  this.isMovingUp = false;
  this.isMovingDown = false;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
}

Player.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height)
  ctx.closePath();
}

function movePlayer(hit) {
  document.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
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
    switch(e.keyCode) {
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

  if(player1.isMovingRight === true && player1.x + player1.width <= canvas.width && !hit)  player1.x += 5;
  if(player1.isMovingLeft  === true && player1.x > 0 && !hit)                              player1.x -= 5;
  if(player1.isMovingUp    === true && player1.y >= 0 && !hit)                             player1.y -= 5;
  if(player1.isMovingDown  === true && player1.y + player1.height <= canvas.height && !hit)player1.y += 5;

  if(player2.isMovingRight === true && player2.x + player2.width <= canvas.width && !hit)  player2.x += 5;
  if(player2.isMovingLeft  === true && player2.x > 0 && !hit)                              player2.x -= 5;
  if(player2.isMovingUp    === true && player2.y >= 0 && !hit)                             player2.y -= 5;
  if(player2.isMovingDown  === true && player2.y + player2.height <= canvas.height && !hit)player2.y += 5;

  console.log(hit);
}

function hitPlayers(player1, player2) {
  var hit = false;
  if (player1.x                  < player2.x + player2.width &&
      player1.x + player1.width  > player2.x &&
      player1.y                  < player2.y + player2.height &&
      player1.height + player1.y > player2.y) {
     // ¡colision detectada!
     //console.log('HIT!!!');
     hit = true;
 }
 return hit;
}

//console.log(hitPlayers(player1, player2));

//Player.prototype.hitPlayers = function(player) {
//  var hit = false;
//  if (this.x               < player.x + player.width &&
//      this.x + this.width  > player.x &&
//      this.y               < player.y + player.height &&
//      this.height + this.y > player.y) {
//     // ¡colision detectada!
//     //console.log('HIT!!!');
//     hit = true;
// }
//}